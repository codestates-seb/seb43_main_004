package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberPostSignUpDto {  //회원가입 post
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String nickName;

    @NotBlank
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
