package com.mainproject.wrieating.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPostNickNameVerifedDto {
    @NotNull
    @Pattern(regexp = "^[a-zA-Z가-힣0-9@#$%^&+=*_-]{1,8}$")
    private String nickName;
}
