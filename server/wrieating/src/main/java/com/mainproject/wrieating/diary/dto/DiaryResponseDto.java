package com.mainproject.wrieating.diary.dto;


import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Day;
import com.mainproject.wrieating.member.dto.StandardIntakeResponseDto;
import com.mainproject.wrieating.member.entity.StandardIntake;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class DiaryResponseDto {
    private Long diaryId;
    private Long memberId;
    private String userDate;
    private String memo;
    private String diaryStatus;
    private String comment;
    private List<MealResponseDto> meal; // 식사 리스트
    private List<Day> dayList; // 하루 식사 칼로리, 탄, 단, 지 리스트
    private List<StandardIntakeResponseDto> standardIntakes;
}