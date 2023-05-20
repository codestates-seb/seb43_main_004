package com.mainproject.wrieating.dataArchive.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodsResponseDto {
    private Long foodId;
    private String foodName;
    private int kcal;
}