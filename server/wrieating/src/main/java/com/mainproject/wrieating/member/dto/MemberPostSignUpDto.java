package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberPostSignUpDto {  //회원가입 post

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "유효한 이메일 주소를 입력해주세요.")
    private String email;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z가-힣0-9@#$%^&+=*_-]{1,8}$")
    private String nickName;

    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,}$")
    private String password;

    @NotNull
    private LocalDate birth;

    @NotBlank
    private String gender;

    @NotNull
    private Integer height;

    @NotNull
    private Integer weight;

    private Member.Activity activity;

    private String icon = "ingredients";

    private Member.Status status = Member.Status.MEMBER_ACTIVE;
    private LocalDateTime createdAt = LocalDateTime.now();
}
