package com.mainproject.wrieating.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPostEmailVerifedDto {
    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "유효한 이메일 주소를 입력해주세요.")
    private String email;
}
