package com.mainproject.wrieating.meal.dto;

import com.mainproject.wrieating.meal.entity.Meal;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MealPostDto {

    private Long mealId;
    private String title;
    private Meal.MealType mealType;
    private int kcal;
    private int servingSize;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int sugar;
    private int salt;
    @NotNull
    private boolean custom;

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }
}