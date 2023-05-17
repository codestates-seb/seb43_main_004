package com.mainproject.wrieating.meal.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public class MealPostDto {

    private Long diaryId;

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
