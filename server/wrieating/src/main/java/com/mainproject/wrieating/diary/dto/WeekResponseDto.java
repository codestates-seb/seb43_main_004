package com.mainproject.wrieating.diary.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeekResponseDto {
    private int carbohydrate;
    private int protein;
    private int fat;
    private int kcal;
    private int sugar;
    private int salt;
}