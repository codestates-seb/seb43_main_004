package com.mainproject.wrieating.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiaryPatchDto {
    private String memo;
    private String diaryStatus;
}
