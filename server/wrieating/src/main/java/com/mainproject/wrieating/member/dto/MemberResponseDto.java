package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String nickName;
    private LocalDate birth;
    private String gender;
    private Integer height;
    private Integer weight;
    private Member.Activity activity;
    private String icon;
}
