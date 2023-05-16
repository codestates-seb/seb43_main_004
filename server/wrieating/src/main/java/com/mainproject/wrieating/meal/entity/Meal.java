package com.mainproject.wrieating.meal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long mealId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @Column(nullable = true)
    private int carbohydrate;

    @Column(nullable = true)
    private int protein;

    @Column(nullable = true)
    private int fat;

    @Column(nullable = true)
    private int kcal;

    @Column(nullable = true)
    private int sugar;

    @Column(nullable = true)
    private int salt;


    public Meal(MealType mealType, int carbohydrate, int protein, int fat, int kcal, int sugar, int salt) {
        this.mealType = mealType;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.fat = fat;
        this.kcal = kcal;
        this.sugar = sugar;
        this.salt = salt;
    }

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }
}