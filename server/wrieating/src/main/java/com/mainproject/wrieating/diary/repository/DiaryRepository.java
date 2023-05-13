package com.mainproject.wrieating.diary.repository;

import com.mainproject.wrieating.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findByUserDate(final LocalDate userDate);
}
