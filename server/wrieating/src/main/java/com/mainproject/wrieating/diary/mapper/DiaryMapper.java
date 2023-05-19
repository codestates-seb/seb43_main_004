package com.mainproject.wrieating.diary.mapper;

import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Component
public interface DiaryMapper {
    default Diary diaryPostDtoToDiary(DiaryPostDto diaryPostDto) {
        Diary diary = new Diary();
        diary.setUserDate(LocalDate.parse(diaryPostDto.getUserDate()));
        diary.setMemo(diaryPostDto.getMemo());

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
                .meal(diary.getMealList().stream()
                        .map( meal ->
                                {
                                        MealResponseDto mealResponseDto = new MealResponseDto();
                                        mealResponseDto.setMealType(meal.getMealType().toString());
                                        mealResponseDto.setKcal(meal.getKcal());
                                        mealResponseDto.setCarbohydrate(meal.getCarbohydrate());
                                        mealResponseDto.setProtein(meal.getProtein());
                                        mealResponseDto.setFat(meal.getFat());
                                        mealResponseDto.setSugar(meal.getSugar());
                                        mealResponseDto.setSalt(meal.getSalt());
                                return mealResponseDto; }).collect(Collectors.toList())
                        )
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
