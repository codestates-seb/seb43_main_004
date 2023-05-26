package com.mainproject.wrieating.diary.mapper;

import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Week;
import com.mainproject.wrieating.member.dto.StandardIntakeResponseDto;
import com.mainproject.wrieating.member.entity.StandardIntake;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
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

    DiaryPostResponseDto diaryToDiaryPostResponseDto(Diary diary);

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
                            mealResponseDto.setMealId(meal.getMealId());
                            mealResponseDto.setTitle(meal.getTitle());
                            mealResponseDto.setMealType(meal.getMealType());
                            mealResponseDto.setServingSize(meal.getServingSize());
                            mealResponseDto.setKcal(meal.getKcal());
                            mealResponseDto.setCarbohydrate(meal.getCarbohydrate());
                            mealResponseDto.setProtein(meal.getProtein());
                            mealResponseDto.setFat(meal.getFat());
                            mealResponseDto.setSugar(meal.getSugar());
                            mealResponseDto.setSalt(meal.getSalt());
                            mealResponseDto.setCustom(meal.isCustom());
                            return mealResponseDto; }).collect(Collectors.toList())
                )
                .standardIntakes(diary.getMember().getStandardIntakes().stream()
                        .map(
                                intake -> {
                                    StandardIntakeResponseDto responseDto = new StandardIntakeResponseDto();
                                    responseDto.setIntakeId(intake.getIntakeId());
                                    responseDto.setMemberId(intake.getMember().getMemberId());
                                    responseDto.setKcal(intake.getKcal());
                                    responseDto.setCarbohydrate(intake.getCarbohydrate());
                                    responseDto.setProtein(intake.getProtein());
                                    responseDto.setFat(intake.getFat());
                                    responseDto.setSugar(intake.getSugar());
                                    responseDto.setSalt(intake.getSalt());

                                    return responseDto;
                                }
                        ).collect(Collectors.toList()))
                .build();
    };

    default DiariesResponseDto diariesResponseDto(Diary diary) {

        return DiariesResponseDto.builder()
                .diaryId(diary.getDiaryId())
                .userDate(diary.getUserDate().toString())
                .diaryStatus(diary.getDiaryStatus())
                .build();
    }

    List<DiariesResponseDto> diariesToDiariesResponseDto(List<Diary> diary);

    // 멀티 리스폰스 객체 추가
    // 다대다 매핑이 되어 있기 때문에 List형태로 응답하는 것임
    default StandardIntakeResponseDto standardIntakeToStandardIntakeResponseDto(StandardIntake standardIntake) {
            StandardIntakeResponseDto standardIntakeResponseDto = new StandardIntakeResponseDto();
            standardIntakeResponseDto.setMemberId(standardIntake.getMember().getMemberId());
            standardIntakeResponseDto.setIntakeId(standardIntake.getIntakeId());
            standardIntakeResponseDto.setKcal(standardIntake.getKcal());
            standardIntakeResponseDto.setCarbohydrate(standardIntake.getCarbohydrate());
            standardIntakeResponseDto.setProtein(standardIntake.getProtein());
            standardIntakeResponseDto.setFat(standardIntake.getFat());
            standardIntakeResponseDto.setSugar(standardIntake.getSugar());
            standardIntakeResponseDto.setSalt(standardIntake.getSalt());
            return standardIntakeResponseDto;
    }

    List<StandardIntakeResponseDto> standardIntakeToStandardIntakeDtos(List<StandardIntake> standardIntake);

    default WeekResponseDto weekToWeekResponseDto(Week week) {
        WeekResponseDto weekResponseDto = new WeekResponseDto();
        weekResponseDto.setSumKcal(week.getSumKcal());
        weekResponseDto.setKcal(week.getAvgKcal());
        weekResponseDto.setCarbohydrate(week.getAvgCarbohydrate());
        weekResponseDto.setProtein(week.getAvgProtein());
        weekResponseDto.setFat(week.getAvgFat());
        weekResponseDto.setSugar(week.getAvgSugar());
        weekResponseDto.setSalt(week.getAvgSalt());

        return weekResponseDto;
    }

    List<WeekResponseDto> weekToWeekResponseDtos(List<Week> weekList);
}