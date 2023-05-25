package com.mainproject.wrieating.meal.dto;

import com.mainproject.wrieating.meal.entity.Meal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealPatchDto {
    private String title;
    private int servingSize;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int kcal;
    private int sugar;
    private int salt;
}