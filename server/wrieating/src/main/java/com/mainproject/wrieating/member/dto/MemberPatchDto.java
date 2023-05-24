package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
@Setter
public class MemberPatchDto {   //회원수정
    private long memberId;
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "유효한 이메일 주소를 입력해주세요.")
    private String email;
    @Pattern(regexp = "^[a-zA-Z가-힣0-9@#$%^&+=*_-]{1,8}$")
    private String nickName;
    private LocalDate birth;
    private String gender;
    private Integer height;
    private Integer weight;
    private Member.Activity activity;
    private String icon;
}
