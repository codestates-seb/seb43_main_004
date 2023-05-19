package com.mainproject.wrieating.dbsource.fooddb.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class FoodData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long foodId;
    private String foodName;
    private String foodRoughType;
    private String foodDetailType;
    private String servingSize;
    private int kcal;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int totalSugar;
    private int natrium;
}
