package com.mainproject.wrieating.diary.mapper;

import com.mainproject.wrieating.diary.dto.DiariesResponseDto;
import com.mainproject.wrieating.diary.dto.DiaryPatchDto;
import com.mainproject.wrieating.diary.dto.DiaryPostDto;
import com.mainproject.wrieating.diary.dto.DiaryResponseDto;
import com.mainproject.wrieating.diary.entity.Diary;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DiaryMapper {
    default Diary diaryPostDtoToDiary(DiaryPostDto diaryPostDto) {
        Diary diary = new Diary();
        diary.setUserDate(LocalDate.parse(diaryPostDto.getUserDate()));
        diary.setMemo(diary.getMemo());

        return diary;
    };

    default DiaryResponseDto diaryToDiaryResponseDto(Diary diary) {
        return DiaryResponseDto.builder()
                .diaryId(diary.getDiaryId())
                .memberId(diary.getMember().getMemberId())
                .userDate(diary.getUserDate().toString())
                .memo(diary.getMemo())
                .diaryStatus(diary.getDiaryStatus())
                .comment(diary.getComment())
                .build();
    };

    default DiariesResponseDto diariesResponseDto(Diary diary) {
        return DiariesResponseDto.builder()
                .userDate(diary.getUserDate().toString())
                .diaryStatus(diary.getDiaryStatus())
                .build();
    }

   List<DiariesResponseDto> DiariesToDiariesResponseDto(List<Diary> diary);
}
