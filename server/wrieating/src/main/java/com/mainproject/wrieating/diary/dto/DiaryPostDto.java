package com.mainproject.wrieating.diary.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class DiaryPostDto {
    private String userDate;
    private String memo;
}
