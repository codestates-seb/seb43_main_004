package com.mainproject.wrieating.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchPasswordDto {
    private String email;
    private String curPassword;
    private String newPassword;
}
