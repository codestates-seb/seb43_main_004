package com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class RecipeData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long recipeId;
    @Column
    private String rcpName;
    private String rcpWay;
    private String rcpPat;
    private int kcal;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int salt;
    @Column
    private String img;
    @Column(columnDefinition = "TEXT")
    private String ingredients;
    private String manual01;
    private String manualImg01;
    private String manual02;
    private String manualImg02;
    private String manual03;
    private String manualImg03;
    private String manual04;
    private String manualImg04;
    private String manual05;
    private String manualImg05;
    private String manual06;
    private String manualImg06;
    @Column(columnDefinition = "TEXT")
    private String rcpNaTip;
}
