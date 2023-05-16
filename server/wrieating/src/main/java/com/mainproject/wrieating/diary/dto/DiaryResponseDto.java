package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.diary.entity.Diary;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;

@Builder
@Getter
public class DiaryResponseDto {
    private Long diaryId;
    private String userDate;
    private String memo;
    private Diary.DiaryStatus diaryStatus;
    private String comment;
}