package com.mainproject.wrieating.meal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Intake {
    private Double totalKcal;
    private Double totalCarbohydrate;
    private Double totalProtein;
    private Double totalFat;
    private Double totalSugar;
    private Double totalSalt;

    public Intake(Double totalKcal, Double totalCarbohydrate, Double totalProtein, Double totalFat, Double totalSugar, Double totalSalt) {
        this.totalKcal = totalKcal;
        this.totalCarbohydrate = totalCarbohydrate;
        this.totalProtein = totalProtein;
        this.totalFat = totalFat;
        this.totalSugar = totalSugar;
        this.totalSalt = totalSalt;
    }
}