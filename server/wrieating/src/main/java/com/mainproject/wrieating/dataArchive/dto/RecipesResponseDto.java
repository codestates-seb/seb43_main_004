package com.mainproject.wrieating.dataArchive.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipesResponseDto {
    private Long recipeId;
    private String img;
    private String rcpName;
    private String rcpWay;
}
