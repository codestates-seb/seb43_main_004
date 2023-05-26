package com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
    private int servingSize;
    private int kcal;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int sugar;
    private int salt;
}
