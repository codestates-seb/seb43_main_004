package com.mainproject.wrieating.meal.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MealPostDto {

    @NotNull
    private Long diaryId;

    private String mealType;

    private int kcal;

    private int carbohydrate;

    private int protein;

    private int fat;

    private int sugar;

    private int salt;

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }
}
