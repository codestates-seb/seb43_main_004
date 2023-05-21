package com.mainproject.wrieating.meal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MealResponseDto {

    private Long mealId;

    private String mealType;

    private int carbohydrate;

    private int protein;

    private int fat;

    private int kcal;

    private int sugar;

    private int salt;

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }

}
