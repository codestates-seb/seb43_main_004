package com.mainproject.wrieating.member.controller;

import com.mainproject.wrieating.dto.SingleResponseDto;
import com.mainproject.wrieating.member.dto.MemberPatchDto;
import com.mainproject.wrieating.member.dto.MemberPostNickNameVerifedDto;
import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@Validated
@Slf4j
public class MemberController {
//    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    // 회원 가입
    @PostMapping("/members/signup")
    public ResponseEntity signUpMember(@Valid @RequestBody MemberPostSignUpDto requestBody){
        MemberPostSignUpDto memberDto = memberService.createMember(requestBody);
        // TODO 이메일 중복 체크
        // TODO 난수 던져 이메일 본인확인
        // TODO 닉네임 중복 체크

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 닉네임 중복 체크
    @PostMapping("/members/nicknamecheck")
    public ResponseEntity nickNameCheckMember(@Valid @RequestBody MemberPostNickNameVerifedDto requestBody){
        log.info(String.valueOf(requestBody));

        Boolean nickNameCheck = memberService.verifiedMemberNickName(requestBody.getNickName());

        return new ResponseEntity<>(
                new SingleResponseDto<>(nickNameCheck),
                HttpStatus.OK);
    }

    // 회원 수정
    @PatchMapping("/members/mypage/update")
    public ResponseEntity updateMember(
            @RequestHeader(name = "Authorization") String token,
            @Valid @RequestBody MemberPatchDto requestBody){
        log.info(String.valueOf(requestBody));

        Member member =
                memberService.updateMember(memberMapper.memberPatchToMember(requestBody), token);

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }

    // 본인 회원 조회
    @GetMapping("/members/mypage")
    public ResponseEntity getMember(@RequestHeader(name = "Authorization") String token){
        Member member = memberService.findMember(token);

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/members/leaveId")
    public ResponseEntity deleteMember(
            @RequestHeader(name = "Authorization") String token) {
        memberService.deleteMember(token);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
