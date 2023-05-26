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
}