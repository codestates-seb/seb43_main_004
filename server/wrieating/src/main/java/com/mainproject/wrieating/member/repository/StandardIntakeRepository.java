package com.mainproject.wrieating.member.repository;

import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.entity.StandardIntake;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StandardIntakeRepository extends JpaRepository<StandardIntake, Long> {
}
