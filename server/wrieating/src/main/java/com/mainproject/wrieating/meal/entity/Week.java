package com.mainproject.wrieating.meal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Week {
    private Long sumKcal;
    private Double avgKcal;
    private Double avgCarbohydrate;
    private Double avgProtein;
    private Double avgFat;
    private Double avgSugar;
    private Double avgSalt;

    public Week(Long sumKcal, Double avgKcal, Double avgCarbohydrate, Double avgProtein, Double avgFat, Double avgSugar, Double avgSalt) {
        this.sumKcal = sumKcal;
        this.avgKcal = avgKcal;
        this.avgCarbohydrate = avgCarbohydrate;
        this.avgProtein = avgProtein;
        this.avgFat = avgFat;
        this.avgSugar = avgSugar;
        this.avgSalt = avgSalt;
    }
}