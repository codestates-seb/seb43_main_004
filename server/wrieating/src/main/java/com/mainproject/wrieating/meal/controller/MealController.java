package com.mainproject.wrieating.meal.controller;

import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.mapper.MealMapper;
import com.mainproject.wrieating.meal.service.MealService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/diaries/{diaries-id}/meal")
public class MealController {

    private final MealService mealService;
    private final MealMapper mapper;

    @PostMapping("/write")
    public ResponseEntity<MealPostDto> createMeal(@PathVariable("diaries-id") Long diaryId, @RequestBody MealPostDto mealPostDto) {
        Meal createdMeal = mealService.createMeal(diaryId, mealPostDto);
        return ResponseEntity.ok(mapper.toDTO(createdMeal));
    }

    @PatchMapping("/update/{meal-id}")
    public ResponseEntity<MealResponseDto> updateMeal(@PathVariable("diaries-id") Long diaryId, @PathVariable("meal-id") Long mealId, @RequestBody MealPatchDto mealPatchDto) {
        Meal updatedMeal = mealService.updateMeal(diaryId, mealId, mealPatchDto);
        return ResponseEntity.ok(mapper.mealToMealResponseDto(updatedMeal));
    }

    @DeleteMapping("/delete/{meal-id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable("diaries-id") Long diaryId, @PathVariable("meal-id") Long mealId) {
        mealService.deleteMeal(diaryId, mealId);
        return ResponseEntity.noContent().build();
    }
}