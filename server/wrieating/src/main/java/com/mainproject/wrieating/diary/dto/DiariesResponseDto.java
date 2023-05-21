package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.meal.entity.Intake;
import com.mainproject.wrieating.meal.entity.Week;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DiariesResponseDto {
    private Long diaryId; // 추가
    private String userDate;
    private String diaryStatus;
}