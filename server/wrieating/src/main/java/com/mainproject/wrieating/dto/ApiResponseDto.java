package com.mainproject.wrieating.dto;

import com.mainproject.wrieating.diary.dto.DiariesResponseDto;
import com.mainproject.wrieating.diary.dto.StandardIntakeDto;
import com.mainproject.wrieating.diary.dto.WeekResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApiResponseDto {
    private List<DiariesResponseDto> data;
    private List<StandardIntakeDto> standardIntake;
    private List<WeekResponseDto> weekList;
    private PageInfo pageInfo;
}