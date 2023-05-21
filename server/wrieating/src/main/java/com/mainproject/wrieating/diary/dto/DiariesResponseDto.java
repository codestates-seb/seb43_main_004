package com.mainproject.wrieating.diary.dto;

import com.mainproject.wrieating.diary.entity.Diary;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DiariesResponseDto {
    private Long diaryId; // 추가
    private String userDate;
    private String diaryStatus;

    public static DiariesResponseDto fromEntity(Diary diary) {
        return DiariesResponseDto.builder()
                .diaryId(diary.getDiaryId())
                .userDate(diary.getUserDate().toString())
                .diaryStatus(diary.getDiaryStatus())
                .build();
    }
}