package com.mainproject.wrieating.meal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Day {
    private Long totalKcal;
    private Long totalCarbohydrate;
    private Long totalProtein;
    private Long totalFat;

    public Day(Long totalKcal, Long totalCarbohydrate, Long totalProtein, Long totalFat) {
        this.totalKcal = totalKcal;
        this.totalCarbohydrate = totalCarbohydrate;
        this.totalProtein = totalProtein;
        this.totalFat = totalFat;
    }
}
