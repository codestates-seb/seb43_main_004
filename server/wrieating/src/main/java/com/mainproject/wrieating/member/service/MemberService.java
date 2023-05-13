package com.mainproject.wrieating.member.service;

import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.member.dto.MemberPatchDeleteDto;
import com.mainproject.wrieating.member.dto.MemberPatchDto;
import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;

    public MemberService(MemberRepository memberRepository, MemberMapper mapper) {
        this.memberRepository = memberRepository;
        this.mapper = mapper;
    }


    public MemberPostSignUpDto createMember(MemberPostSignUpDto memberDto){
        Member member = mapper.memberPostToMember(memberDto);
        Member savedMember = memberRepository.save(member);
        MemberPostSignUpDto savedMemberDto = mapper.memberToMemberPost(savedMember);

        return savedMemberDto;
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(findMember.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getNickName())
                .ifPresent(name -> findMember.setNickName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(pw -> findMember.setPassword(pw));
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
    public Member findMember(long memberId){
        return findVerifiedMember(memberId);
    }

    public void deleteMember(long memberId) {
        MemberPatchDeleteDto findMember = mapper.memberToMemberPatchDelete(findVerifiedMember(memberId));
        // 회원 삭제하지않고 status만 바꾸는 로직
        // TODO 일정 시간 지난 후 삭제되게끔 작성
        
        findMember.setStatus(Member.Status.MEMBER_QUIT);
    }


    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
