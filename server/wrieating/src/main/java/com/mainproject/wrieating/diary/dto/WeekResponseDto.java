package com.mainproject.wrieating.diary.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeekResponseDto {
    private Long sumKcal;
    private double kcal;
    private double carbohydrate;
    private double protein;
    private double fat;
    private double sugar;
    private double salt;

    public WeekResponseDto() {
        this.sumKcal = 0L;
        this.kcal = 0.0;
        this.carbohydrate = 0.0;
        this.protein = 0.0;
        this.fat = 0.0;
        this.sugar = 0.0;
        this.salt = 0.0;
    }
}