package com.mainproject.wrieating.meal.service;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.repository.FoodArchiveRepository;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
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

    public Meal createMeal(Long diaryId, MealPostDto mealPostDto) {
        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        Meal meal = mapper.mealPostDtoToMeal(mealPostDto);
        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();
            meal.setDiary(diary);

            if (mealPostDto.isCustom()) {
                FoodData foodData = new FoodData();
                foodData.setFoodName(meal.getTitle());
                foodData.setKcal(meal.getKcal());
                foodData.setCarbohydrate(meal.getCarbohydrate());
                foodData.setProtein(meal.getProtein());
                foodData.setFat(meal.getFat());
                foodData.setTotalSugar(meal.getSugar());
                foodData.setNatrium(meal.getSalt());
                foodArchiveRepository.save(foodData);
            }

            return mealRepository.save(meal);
        }
        throw new IllegalArgumentException("Diary not found with ID: " + diaryId);
    }

    public Meal updateMeal(Long diaryId, Long mealId, MealPatchDto mealPatchDto) {
        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();
            Optional<Meal> optionalMeal = diary.getMealList().stream()
                    .filter(m -> m.getMealId().equals(mealId))
                    .findFirst();
            if (optionalMeal.isPresent()) {
                Meal existingMeal = optionalMeal.get();
                if (mealPatchDto.getTitle() != null) {
                    existingMeal.setTitle(mealPatchDto.getTitle());
                }
                if (mealPatchDto.getMealType() != null) {
                    existingMeal.setMealType(mealPatchDto.getMealType());
                }
                if (mealPatchDto.getKcal() != 0) {
                    existingMeal.setKcal(mealPatchDto.getKcal());
                }
                // 나머지 필드들도 동일한 방식으로 업데이트

                return mealRepository.save(existingMeal);
            }
            throw new IllegalArgumentException("Meal not found with ID: " + mealId);
        }
        throw new IllegalArgumentException("Diary not found with ID: " + diaryId);
    }


    public void deleteMeal(Long diaryId, Long mealId) {
        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();
            Optional<Meal> optionalMeal = diary.getMealList().stream()
                    .filter(m -> m.getMealId().equals(mealId))
                    .findFirst();
            if (optionalMeal.isPresent()) {
                Meal meal = optionalMeal.get();
                mealRepository.delete(meal);
            } else {
                throw new IllegalArgumentException("Meal not found with ID: " + mealId);
            }
        } else {
            throw new IllegalArgumentException("Diary not found with ID: " + diaryId);
        }
    }


    public Meal findMeal(long mealId) {
        return mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("No data"));
    }
}