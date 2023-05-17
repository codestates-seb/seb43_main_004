package com.mainproject.wrieating.member.mapper;

import com.mainproject.wrieating.member.dto.MemberPatchDeleteDto;
import com.mainproject.wrieating.member.dto.MemberPatchDto;
import com.mainproject.wrieating.member.dto.MemberPostSignUpDto;
import com.mainproject.wrieating.member.dto.MemberResponseDto;
import com.mainproject.wrieating.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface MemberMapper {
    Member memberPostToMember(MemberPostSignUpDto requestBody);
    Member memberPatchToMember(MemberPatchDto requestBody);
    MemberPostSignUpDto memberToMemberPost(Member member);
    MemberPatchDto memberToMemberPatch(Member member);
    MemberPatchDeleteDto memberToMemberPatchDelete(Member member);
    MemberResponseDto memberToMemberResponse(Member member);

}
