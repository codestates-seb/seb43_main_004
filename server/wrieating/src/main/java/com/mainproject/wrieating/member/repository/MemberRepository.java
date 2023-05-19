package com.mainproject.wrieating.member.repository;

import com.mainproject.wrieating.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByNickName(String nickName);
}
