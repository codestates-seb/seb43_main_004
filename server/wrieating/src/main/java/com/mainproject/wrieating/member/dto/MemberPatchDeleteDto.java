package com.mainproject.wrieating.member.dto;

import com.mainproject.wrieating.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDeleteDto {
    private Member.Status status;
}
