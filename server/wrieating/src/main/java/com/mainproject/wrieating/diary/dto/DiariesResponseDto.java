package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.diary.entity.Diary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DiariesResponseDto {
    private String userDate;
    private Diary.DiaryStatus diaryStatus;
}
