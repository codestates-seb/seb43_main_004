package com.mainproject.wrieating.dataArchive.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
public class RecipeDataResponseDto {
    private long recipeId;
    private String rcpName;
    private String rcpWay;
    private String rcpPat;
    private int kcal;
    private int carbohydrate;
    private int protein;
    private int fat;
    private int salt;
    private String img;
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
    private String rcpNaTip;
}
