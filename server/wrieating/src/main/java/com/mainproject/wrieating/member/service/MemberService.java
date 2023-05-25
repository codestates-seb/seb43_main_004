package com.mainproject.wrieating.member.service;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.auth.utils.CustomAuthorityUtils;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.helper.email.EmailSender;
import com.mainproject.wrieating.helper.email.RandomGenerator;
import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.entity.StandardIntake;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.repository.MemberRepository;
import com.mainproject.wrieating.member.repository.StandardIntakeRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.mail.AuthenticationFailedException;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import java.time.LocalDate;
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
    private final StandardIntakeRepository standardIntakeRepository;

    private final EmailSender emailSender;

    // 이메일 전송 로직 및 예외처리
    public String sendVerificationEmail(String email) throws MessagingException {
        // Verification Code 생성
        String verificationCode = RandomGenerator.generateRandomCode(6);

        // 이메일 인증 메일 발송
        try {
            emailSender.sendVerificationEmail(email, verificationCode);
        } catch (AuthenticationFailedException e) {
            // 메일 발신 계정의 정보가 잘못된 경우 처리

            throw new MessagingException("Authentication failed. Check your username and password.", e);
        } catch (SendFailedException e) {
            // 수신자의 이메일 주소가 유효하지 않거나 도달할 수 없는 경우 처리

            throw new MessagingException("Failed to send email to recipient.", e);
        } catch (MessagingException e) {
            // SMTP 서버와의 통신 문제나 메일 전송 중에 예기치 않은 오류가 발생할 경우 처리

            throw new MessagingException("Error sending email.", e);
        }

        return verificationCode;
    }

    public MemberPostSignUpDto createMember(MemberPostSignUpDto memberDto){
        Member member = mapper.memberPostToMember(memberDto);

        // 이메일, 닉네임 중복 체크
        if(verifiedMemberEmail(member.getEmail())){
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
        } else if (verifiedMemberNickName(member.getNickName())){
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
        }

        // JWT
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);
        MemberPostSignUpDto savedMemberDto = mapper.memberToMemberPost(savedMember);

        saveIntake(savedMember.getMemberId());

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
        Optional.ofNullable(member.getIcon())
                .ifPresent(icon -> findMember.setIcon(icon));

        return memberRepository.save(findMember);
    }

    // 마이페이지 회원 비밀번호 변경
    public Member updatePasswordMember(String token, String curPassword, String newPassword){
        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);
        if (passwordEncoder.matches(curPassword, findMember.getPassword())) {
            if(!passwordEncoder.matches(newPassword, findMember.getPassword())){

                findMember.setPassword(passwordEncoder.encode(newPassword));

                return memberRepository.save(findMember);
            } else { // 현재 비밀번호와 new 비밀번호가 같을 시
                throw new BusinessLogicException(ExceptionCode.PASSWORD_IDENTICAL);
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_MISMATCHED);
        }
    }

    // 비밀번호 찾기시 (새 비밀번호 변경)
    public Member updatePasswordFindMember(String email, String newPassword){
        Optional<Member> findMember = memberRepository.findByEmail(email);

        if (findMember.isPresent()) {
            Member member = findMember.get();

            // JWT
            String encryptedPassword = passwordEncoder.encode(newPassword);
            member.setPassword(encryptedPassword);

            // 변경된 멤버 정보를 저장합니다.
            return memberRepository.save(member);
        } else { // 이메일에 해당하는 멤버가 없는 경우 처리할 로직
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
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

    public Member deleteMember(String token) {
        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);
        // 회원 삭제하지않고 status만 바꾸는 로직
        
        findMember.setStatus(Member.Status.MEMBER_QUIT);

        return memberRepository.save(findMember);
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

    // standard intake 계산
    private void saveIntake(long memberId) {
        StandardIntake standardIntake = new StandardIntake();
        Member member = findVerifiedMember(memberId);
        int birth = LocalDate.now().minusYears(member.getBirth().getYear()).getYear();

        if (member.getGender().equals("male")) {
            double bmrMale = 66.5 + (13.75 * member.getWeight()) + (5.003 * member.getHeight()) - (6.75 * birth);

            calIntake(standardIntake, member, bmrMale);

            standardIntakeRepository.save(standardIntake);
        }

        if (member.getGender().equals("female")){
            double bmrFemale = 655.1 + (9.563 * member.getWeight()) + (1.850 * member.getHeight()) - (4.676 * birth);

            calIntake(standardIntake, member, bmrFemale);

            standardIntakeRepository.save(standardIntake);
        }
    }

    private void calIntake(StandardIntake standardIntake, Member member, double bmr) {
        if (member.getActivity().equals(Member.Activity.NONE_ACTIVE)) {
            standardIntake.setMember(member);
            standardIntake.setKcal(bmr * 1.2);
            standardIntake.setCarbohydrate((bmr * 0.5)/4);
            standardIntake.setProtein((bmr * 0.15)/4);
            standardIntake.setFat((bmr * 0.25)/9);
            standardIntake.setSugar(((bmr * 1.2) * 0.1)/4);
            standardIntake.setSalt((bmr * 0.12)*10);
        } else if (member.getActivity().equals(Member.Activity.LIGHTLY_ACTIVE)) {
            standardIntake.setMember(member);
            standardIntake.setKcal(bmr * 1.375);
            standardIntake.setCarbohydrate((bmr * 0.6)/4);
            standardIntake.setProtein((bmr * 0.17)/4);
            standardIntake.setFat((bmr * 0.3)/9);
            standardIntake.setSugar(((bmr * 1.375) * 0.1)/4);
            standardIntake.setSalt((bmr * 0.12)*10);
        } else if (member.getActivity().equals(Member.Activity.MODERATELY_ACTIVE)) {
            standardIntake.setMember(member);
            standardIntake.setKcal((bmr * 1.55));
            standardIntake.setCarbohydrate((bmr * 0.7)/4);
            standardIntake.setProtein((bmr * 0.2)/4);
            standardIntake.setFat((bmr * 0.35)/9);
            standardIntake.setSugar(((bmr * 1.55) * 0.1)/4);
            standardIntake.setSalt((bmr * 0.12)*10);
        } else if (member.getActivity().equals(Member.Activity.VERY_ACTIVE)) {
            standardIntake.setMember(member);
            standardIntake.setKcal(bmr * 1.725);
            standardIntake.setCarbohydrate((bmr * 0.8)/4);
            standardIntake.setProtein((bmr * 0.25)/4);
            standardIntake.setFat((bmr * 0.4)/9);
            standardIntake.setSugar(((bmr * 1.725) * 0.1)/4);
            standardIntake.setSalt((bmr * 0.12)*10);
        } else if (member.getActivity().equals(Member.Activity.EXTREMELY_ACTIVE)) {
            standardIntake.setMember(member);
            standardIntake.setKcal(bmr * 1.9);
            standardIntake.setCarbohydrate((bmr * 0.9)/4);
            standardIntake.setProtein((bmr * 0.3)/4);
            standardIntake.setFat((bmr * 0.45)/9);
            standardIntake.setSugar(((bmr * 1.9) * 0.1)/4);
            standardIntake.setSalt((bmr * 0.12)*10);
        }
    }
}
