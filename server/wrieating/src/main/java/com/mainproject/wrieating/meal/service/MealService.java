package com.mainproject.wrieating.meal.service;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.repository.FoodArchiveRepository;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.diary.service.DiaryService;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.dto.MealPostResponseDto;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.mapper.MealMapper;
import com.mainproject.wrieating.meal.repository.MealRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MealService {
    private final MealRepository mealRepository;
    private final DiaryRepository diaryRepository;
    private final FoodArchiveRepository foodArchiveRepository;
    private final MealMapper mapper;
    private final DiaryService diaryService;

    public MealPostResponseDto createMeal(Long diaryId, MealPostDto mealPostDto) {
        Diary diary = diaryService.findVerifiedDiary(diaryId);
        Meal meal = mapper.mealPostDtoToMeal(mealPostDto);

            meal.setDiary(diary);

            if (mealPostDto.isCustom()) {
                FoodData foodData = new FoodData();
                foodData.setFoodName(meal.getTitle());
                foodData.setKcal(meal.getKcal());
                foodData.setServingSize(meal.getServingSize());
                foodData.setCarbohydrate(meal.getCarbohydrate());
                foodData.setProtein(meal.getProtein());
                foodData.setFat(meal.getFat());
                foodData.setSugar(meal.getSugar());
                foodData.setSalt(meal.getSalt());
                foodArchiveRepository.save(foodData);
            }

            return mapper.MealToMealPostResponseDto(mealRepository.save(meal));
        }

    public void updateMeal(Long diaryId, Long mealId, MealPatchDto mealPatchDto) {
        diaryService.findVerifiedDiary(diaryId);
        Meal meal = verifiedMeal(mealId);

        Optional.ofNullable(mealPatchDto.getTitle())
                .ifPresent(meal::setTitle);
        Optional.ofNullable(mealPatchDto.getServingSize())
                        .ifPresent(meal::setServingSize);
        Optional.ofNullable(mealPatchDto.getKcal())
                .ifPresent(meal::setKcal);
        Optional.ofNullable(mealPatchDto.getCarbohydrate())
                .ifPresent(meal::setCarbohydrate);
        Optional.ofNullable(mealPatchDto.getProtein())
                .ifPresent(meal::setProtein);
        Optional.ofNullable(mealPatchDto.getFat())
                .ifPresent(meal::setFat);
        Optional.ofNullable(mealPatchDto.getSugar())
                .ifPresent(meal::setSugar);
        Optional.ofNullable(mealPatchDto.getSalt())
                .ifPresent(meal::setSalt);

        mealRepository.save(meal);
    }


    public void deleteMeal(Long diaryId, Long mealId) {
        Diary diary = diaryService.findVerifiedDiary(diaryId);
        Meal meal = verifiedMeal(mealId);

        diary.setMealList(null);

        mealRepository.delete(meal);
    }

    private Meal verifiedMeal(long mealId) {
        return mealRepository.findById(mealId)
                .orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.MEAL_NOT_FOUND)
                );
    }
}