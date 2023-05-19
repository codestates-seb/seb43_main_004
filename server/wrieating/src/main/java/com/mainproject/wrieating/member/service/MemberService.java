package com.mainproject.wrieating.member.service;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.auth.utils.CustomAuthorityUtils;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
//import com.mainproject.wrieating.helper.email.EmailSender;
//import com.mainproject.wrieating.helper.email.RandomGenerator;
import com.mainproject.wrieating.member.dto.MemberPatchDeleteDto;
import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtTokenizer jwtTokenizer;
//    private final EmailSender emailSender;

//    public String sendVerificationEmail(String email) {
//        // Verification Code 생성
//        String verificationCode = RandomGenerator.generateRandomCode(6);
//
//        // 이메일 인증 메일 발송
//        emailSender.sendVerificationEmail(email, verificationCode);
//
//        return verificationCode;
//    }

    public MemberPostSignUpDto createMember(MemberPostSignUpDto memberDto){
        Member member = mapper.memberPostToMember(memberDto);

        // JWT
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        MemberPostSignUpDto savedMemberDto = mapper.memberToMemberPost(savedMember);

        return savedMemberDto;
    }

    public Member updateMember(Member member, String token){
        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);

        Optional.ofNullable(member.getNickName())
                .ifPresent(name -> findMember.setNickName(name));
        Optional.ofNullable(member.getBirth())
                .map(birth -> {
                    findMember.setBirth(birth);
                    return birth;   // ifPresent 람다식에 LocalDate타입이 캐스트되지않음.
                });
        Optional.ofNullable(member.getGender())
                .ifPresent(gender -> findMember.setGender(gender));
        Optional.ofNullable(member.getHeight())
                .ifPresent(height -> findMember.setHeight(height));
        Optional.ofNullable(member.getWeight())
                .ifPresent(weight -> findMember.setWeight(weight));
        Optional.ofNullable(member.getActivity())
                .ifPresent(activity -> findMember.setActivity(activity));

        return memberRepository.save(findMember);
    }

    // 회원 마이페이지
    @Transactional(readOnly = true)
    public Member findMember(String token){
        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);

        if(findMember.getStatus().equals(Member.Status.MEMBER_QUIT)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        return findMember;
    }

    public void deleteMember(String token) {
        long memberId = jwtTokenizer.getMemberId(token);

        MemberPatchDeleteDto findMember = mapper.memberToMemberPatchDelete(findVerifiedMember(memberId));
        // 회원 삭제하지않고 status만 바꾸는 로직
        // TODO 일정 시간 지난 후 삭제되게끔 작성
        
        findMember.setStatus(Member.Status.MEMBER_QUIT);
    }

    // 멤버 여부 체크
    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    // 이메일 중복 체크
    @Transactional(readOnly = true)
    public boolean verifiedMemberEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 닉네임 중복 체크
    @Transactional(readOnly = true)
    public boolean verifiedMemberNickName(String nickName) {
        return memberRepository.existsByNickName(nickName);
    }
}
