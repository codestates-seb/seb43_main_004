package com.mainproject.wrieating.member.controller;

import com.mainproject.wrieating.dto.SingleResponseDto;
//import com.mainproject.wrieating.helper.email.EmailSenderResponse;
import com.mainproject.wrieating.helper.email.EmailSenderResponse;
import com.mainproject.wrieating.member.dto.*;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.mapper.MemberMapper;
import com.mainproject.wrieating.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;

@RestController
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    // 이메일 인증(회원가입시) & 이메일 중복 체크
    @PostMapping("/members/sendmail")
    public ResponseEntity sendVerificationEmail(@RequestBody EmailRequestDto emailRequestDto) throws MessagingException{
        String email = emailRequestDto.getEmail();

        if (memberService.verifiedMemberEmail(email)) {
            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(true);
            response.setMessage("이미 존재하는 이메일입니다.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            // 이메일 인증 코드 생성 및 이메일 발송
            String verificationCode = memberService.sendVerificationEmail(email);

            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(false);
            response.setMessage(verificationCode);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    // 이메일 인증(비밀번호 찾기시)
    @PostMapping("/members/findpassword/sendmail")
    public ResponseEntity findpasswordSendVerificationEmail(@RequestBody EmailRequestDto emailRequestDto) throws MessagingException {
        String email = emailRequestDto.getEmail();

        if (memberService.verifiedMemberEmail(email)){ // 이메일이 존재한다면
            // 이메일 인증 코드 생성 및 이메일 발송
            String verificationCode = memberService.sendVerificationEmail(email);

            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(true);
            response.setMessage(verificationCode);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        else{
            EmailSenderResponse response = new EmailSenderResponse();
            response.setIsactive(false);
            response.setMessage("이메일이 존재하지 않습니다.");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // 회원 가입
    @PostMapping("/members/signup")
    public ResponseEntity signUpMember(@Valid @RequestBody MemberPostSignUpDto requestBody){
        MemberPostSignUpDto memberDto = memberService.createMember(requestBody);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 이메일 중복 체크
    @PostMapping("/members/emailcheck")
    public ResponseEntity emailCheckMember(@Valid @RequestBody MemberPostEmailVerifedDto requestBody){
        log.info(String.valueOf(requestBody));

        Boolean emailCheck = memberService.verifiedMemberEmail(requestBody.getEmail());

        return new ResponseEntity<>(
                new SingleResponseDto<>(emailCheck),
                HttpStatus.OK);
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

    // 회원 비밀번호 수정
    @PatchMapping("/members/mypage/passwordupdate")
    public ResponseEntity passwordUpdateMember(
            @RequestHeader(name = "Authorization") String token
            ,@Valid @RequestBody MemberPatchPasswordDto requestBody){

        String curPassword = requestBody.getCurPassword();
        String newPassword = requestBody.getNewPassword();

        Member member = memberService.updatePasswordMember(token, curPassword, newPassword);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 비밀번호 찾기(새 비밀번호로 변경)
    @PatchMapping("/members/findpassword")
    public ResponseEntity findpasswordMember(@Valid @RequestBody MemberPatchPasswordDto requestBody){

        String email = requestBody.getEmail();
        String newPassword = requestBody.getNewPassword();

        Member member = memberService.updatePasswordFindMember(email,newPassword);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 본인 회원 조회
    @GetMapping("/members/myprofile")
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
