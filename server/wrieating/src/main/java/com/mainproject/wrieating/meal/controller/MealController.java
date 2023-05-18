package com.mainproject.wrieating.meal.controller;

import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.mapper.MealMapper;
import com.mainproject.wrieating.meal.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@CrossOrigin
@RequestMapping("/meal")
@RestController
@RequiredArgsConstructor
public class MealController {
    private final MealMapper mapper;
    private final MealService mealService;

    @PostMapping
    public ResponseEntity postMeal(@RequestBody MealPostDto mealPostDto) {

        Meal meal = mapper.mealPostDtoToMeal(mealPostDto);

        mealService.createMeal(meal);

        return new ResponseEntity<>(mapper.mealToMealResponseDto(meal), HttpStatus.OK);

    }

    @PatchMapping("/{mealId}")
    public ResponseEntity updateMeal(@PathVariable Long mealId, @RequestBody MealPatchDto mealPatchDto) {

        Meal meal = mapper.mealPatchDtoToMeal(mealPatchDto);
        meal.setMealId(mealId);
        Meal result = mealService.updateMeal(meal);

        return new ResponseEntity<>(mapper.mealToMealResponseDto(result), HttpStatus.OK);
    }

    @DeleteMapping("/{mealId}")
    public ResponseEntity deleteMeal(@PathVariable @Positive long mealId) {
        mealService.deleteMeal(mealId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
