package com.mainproject.wrieating.meal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Day {
    private Double totalKcal;
    private Double totalCarbohydrate;
    private Double totalProtein;
    private Double totalFat;

    public Day(Double totalKcal, Double totalCarbohydrate, Double totalProtein, Double totalFat) {
        this.totalKcal = totalKcal;
        this.totalCarbohydrate = totalCarbohydrate;
        this.totalProtein = totalProtein;
        this.totalFat = totalFat;
    }
}
