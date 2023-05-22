package com.mainproject.wrieating.meal.repository;

import com.mainproject.wrieating.meal.entity.Day;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.entity.Week;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface MealRepository extends JpaRepository<Meal, Long> { //뽑아서 day에 넣어준다는거, 각각 매핑해서 엔티티에 넣음
    @Query("SELECT new com.mainproject.wrieating.meal.entity.Day(SUM(m.kcal), SUM(m.carbohydrate), SUM(m.protein), SUM(m.fat), SUM(m.sugar), SUM(m.salt)) FROM Meal m WHERE m.diary.diaryId = :diaryId")
    Day getMealSummaryByDiaryId(@Param("diaryId") Long diaryId);

    @Query("SELECT new com.mainproject.wrieating.meal.entity.Week(SUM(m.kcal), AVG(m.kcal), AVG(m.carbohydrate), AVG(m.protein), AVG(m.fat), AVG(m.sugar), AVG(m.salt)) " +
            "FROM Meal m JOIN m.diary d " +
            "WHERE d.member.memberId = :memberId AND d.userDate BETWEEN :startOfPreviousWeek AND :endOfPreviousWeek")
    Week getPreviousWeekData(@Param("memberId") Long memberId, @Param("startOfPreviousWeek") LocalDate startOfPreviousWeek, @Param("endOfPreviousWeek") LocalDate endOfPreviousWeek);

}