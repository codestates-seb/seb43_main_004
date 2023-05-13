package com.mainproject.wrieating.meal.mapper;

import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.entity.Meal;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MealMapper {
    Meal mealPostDtoToMeal(MealPostDto mealPostDto);

    Meal mealPatchDtoToMeal(MealPatchDto mealPatchDto);

    Meal mealToMealResponseDto(Meal meal);
}