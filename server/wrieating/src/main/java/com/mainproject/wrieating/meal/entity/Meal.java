package com.mainproject.wrieating.meal.entity;

import com.mainproject.wrieating.diary.entity.Diary;
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
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @Column(nullable = true)
    private int kcal;

    @Column
    private int servingSize;

    @Column(nullable = true)
    private int carbohydrate;

    @Column(nullable = true)
    private int protein;

    @Column(nullable = true)
    private int fat;

    @Column(nullable = true)
    private int sugar;

    @Column(nullable = true)
    private int salt;

    private boolean isCustom;

    @ManyToOne
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    public void setDiary(Diary diary) {
        this.diary = diary;
        diary.getMealList().add(this);
    }

    public Meal(Long mealId, String title, MealType mealType, int kcal, int carbohydrate, int protein, int fat, int sugar, int salt, Diary diary) {
        this.mealId = mealId;
        this.title = title;
        this.mealType = mealType;
        this.kcal = kcal;
        this.carbohydrate = carbohydrate;
        this.protein = protein;
        this.fat = fat;
        this.sugar = sugar;
        this.salt = salt;
        this.diary = diary;
    }

    public enum MealType {
        BREAKFAST,
        LUNCH,
        DINNER,
        SNACK
    }
}