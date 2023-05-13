package com.mainproject.wrieating.member.service;

import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.repository.MemberRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class MemberServiceMockTest {
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private MemberMapper memberMapper;
    @InjectMocks
    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberRepository = Mockito.mock(MemberRepository.class);
        memberMapper = Mockito.mock(MemberMapper.class);
        memberService = new MemberService(memberRepository, memberMapper);
    }

    @Test
    public void createMemberTest(){
        //given
        MemberPostSignUpDto memberDto = new MemberPostSignUpDto();
        Member member = new Member();
        member.setEmail(memberDto.getEmail());
        member.setNickName(memberDto.getNickName());
        member.setPassword(memberDto.getPassword());
        member.setBirth(memberDto.getBirth());
        member.setGender(memberDto.getGender());
        member.setHeight(memberDto.getHeight());
        member.setWeight(memberDto.getWeight());
        member.setActivity(memberDto.getActivity());
        member.setStatus(memberDto.getStatus());

        given(memberMapper.memberPostToMember(memberDto)).willReturn(member);
        given(memberRepository.save(Mockito.any(Member.class))).willReturn(member);
        given(memberMapper.memberToMemberPost(member)).willReturn(memberDto);
//        given(memberRepository.save(Mockito.any(Member.class))).willReturn(member);

        //멤버가 생성됨과 동시에 standardIntake 객체 생성(추후)
        //when
        MemberPostSignUpDto createdMember = memberService.createMember(memberDto);

        //then
        assertThat(createdMember).isNotNull();
        assertThat(createdMember.getEmail()).isEqualTo(member.getEmail());
        assertThat(createdMember.getNickName()).isEqualTo(member.getNickName());
        assertThat(createdMember.getPassword()).isEqualTo(member.getPassword());
        assertThat(createdMember.getBirth()).isEqualTo(member.getBirth());
        assertThat(createdMember.getGender()).isEqualTo(member.getGender());
        assertThat(createdMember.getHeight()).isEqualTo(member.getHeight());
        assertThat(createdMember.getWeight()).isEqualTo(member.getWeight());
        assertThat(createdMember.getActivity()).isEqualTo(member.getActivity());
        assertThat(createdMember.getStatus()).isEqualTo(member.getStatus());
    }

    @Test
    public void updateMemberTest(){
        //given
        Member member = new Member();
        member.setMemberId(1L);
        member.setEmail("hgd@gmail.com");
        member.setNickName("홍길동");
        member.setPassword("qwe123!@#");
        member.setBirth(LocalDate.parse("1995-12-23"));
        member.setGender("Male");
        member.setHeight(180);
        member.setWeight(80);
        member.setActivity(Member.Activity.NONE_ACTIVITY);

        Mockito.when(memberRepository.save(member)).thenReturn(member);
        Mockito.when(memberRepository.findById(member.getMemberId())).thenReturn(Optional.of(member));

        Member updateMember = memberService.updateMember(member);

        //when
        //then
        assertThat(updateMember).isNotNull();
    }

    @Test
    public void findVerifiedMemberTest() {
        // given
        long memberId = 1L;
        Member member = new Member();
        member.setMemberId(memberId);

        // Mock 객체 생성 및 동작 정의
        Mockito.when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));

        // when
        Member result = memberService.findVerifiedMember(memberId);

        // then
        assertThat(result).isNotNull();
        assertThat(result.getMemberId()).isEqualTo(memberId);
    }
}
