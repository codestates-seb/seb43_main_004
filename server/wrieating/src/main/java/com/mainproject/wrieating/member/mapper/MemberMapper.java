package com.mainproject.wrieating.member.mapper;

import com.mainproject.wrieating.member.dto.*;
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
    MemberResponseDto memberToMemberResponse(Member member);

}
