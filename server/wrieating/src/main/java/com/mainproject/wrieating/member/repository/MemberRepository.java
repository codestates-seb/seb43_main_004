package com.mainproject.wrieating.member.repository;

import com.mainproject.wrieating.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailOrNickName(String email, String nickName);
}
