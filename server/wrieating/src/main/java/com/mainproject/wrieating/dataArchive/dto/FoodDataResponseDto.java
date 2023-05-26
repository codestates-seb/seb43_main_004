package com.mainproject.wrieating.dataArchive.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodDataResponseDto {
    private long foodId;
    private String foodName;
    private String foodRoughType;
    private String foodDetailType;
    private int servingSize;
    private int kcal;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int sugar;
    private int salt;
}
