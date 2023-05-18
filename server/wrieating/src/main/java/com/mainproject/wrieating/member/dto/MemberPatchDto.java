package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
public class MemberPatchDto {   //회원수정
    private long memberId;
    @Email
    private String email;
    private String nickName;
    private String password;
    private LocalDate birth;
    private String gender;
    private Integer height;
    private Integer weight;
    private Member.Activity activity;
}
