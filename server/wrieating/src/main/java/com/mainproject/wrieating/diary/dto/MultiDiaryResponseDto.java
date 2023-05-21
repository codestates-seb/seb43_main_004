package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.dto.PageInfo;
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
public class MultiDiaryResponseDto<T> {
    private List<T> data;
    private List<StandardIntakeDto> standardIntake;
    private List<WeekResponseDto> weekList;
    private PageInfo pageInfo;
}