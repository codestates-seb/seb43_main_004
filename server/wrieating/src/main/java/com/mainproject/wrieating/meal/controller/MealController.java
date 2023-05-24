package com.mainproject.wrieating.meal.controller;

import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.dto.MealPostResponseDto;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.mapper.MealMapper;
import com.mainproject.wrieating.meal.service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;


@RestController
@AllArgsConstructor
@RequestMapping("/diaries/{diaries-id}/meal")
public class MealController {

    private final MealService mealService;
    private final MealMapper mapper;

    @PostMapping("/write")
    public ResponseEntity createMeal(@Positive @PathVariable("diaries-id") Long diaryId,
                                     @RequestBody MealPostDto mealPostDto) {
        MealPostResponseDto responseDto = mealService.createMeal(diaryId, mealPostDto);

        return new ResponseEntity<>(responseDto,HttpStatus.CREATED);
    }

    @PatchMapping("/update/{meal-id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateMeal(@Positive @PathVariable("diaries-id") Long diaryId,
                           @Positive @PathVariable("meal-id") Long mealId,
                           @RequestBody MealPatchDto mealPatchDto) {
        mealService.updateMeal(diaryId, mealId, mealPatchDto);
    }

    @DeleteMapping("/delete/{meal-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMeal(@Positive @PathVariable("diaries-id") Long diaryId,
                           @Positive @PathVariable("meal-id") Long mealId) {
        mealService.deleteMeal(diaryId, mealId);
    }
}