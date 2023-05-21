package com.mainproject.wrieating.dto;

import com.mainproject.wrieating.diary.dto.StandardIntakeDto;
import com.mainproject.wrieating.diary.dto.WeekResponseDto;
import com.mainproject.wrieating.diary.entity.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultiResponseDto2<T> {
    private List<T> data;
    private List<StandardIntakeDto> standardIntake;
    private List<WeekResponseDto> weekList;
    private PageInfo pageInfo;
}