package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.diary.entity.Diary;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;

@Builder
@Getter
public class DiaryResponseDto {
    private Long diaryId;
    private Long memberId;
    private String userDate;
    private String memo;
    private String diaryStatus;
    private String comment;
}
