package com.mainproject.wrieating.meal.mapper;

import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Meal;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface MealMapper {

    MealPostDto toDTO(Meal meal);

    Meal mealPostDtoToMeal(MealPostDto mealPostDTO);

    Meal mealPatchDtoToMeal(MealPatchDto mealPatchDto);

    MealResponseDto mealToMealResponseDto(Meal meal);
}