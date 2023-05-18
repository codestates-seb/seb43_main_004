package com.mainproject.wrieating.diary.dto;


import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Day;
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
    private List<MealResponseDto> meal;
    private List<Day> dayList;
}
