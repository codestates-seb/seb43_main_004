package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.dto.PageInfo;
import com.mainproject.wrieating.member.dto.StandardIntakeResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MultiDiaryResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;
    private List<StandardIntakeResponseDto> standardIntakes;
    private List<WeekResponseDto> weekList;


    public MultiDiaryResponseDto(List<T> data, Page page, List<StandardIntakeResponseDto> standardIntakeResponseDto, List<WeekResponseDto> weekList ) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
        this.standardIntakes = standardIntakeResponseDto;
        this.weekList = weekList;
    }

    public MultiDiaryResponseDto(List<T> data, Page page, List<WeekResponseDto> weekList) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
        this.weekList = weekList;
    }
}
