package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.dto.PageInfo;
import com.mainproject.wrieating.member.dto.StandardIntakeResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
public class MultiDiaryResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;
    private List<StandardIntakeResponseDto> standardIntakes;


    public MultiDiaryResponseDto(List<T> data, Page page, List<StandardIntakeResponseDto> standardIntakeResponseDto) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
        this.standardIntakes = standardIntakeResponseDto;
    }
}
