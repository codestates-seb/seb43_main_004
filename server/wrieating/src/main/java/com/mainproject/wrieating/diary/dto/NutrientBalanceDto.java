package com.mainproject.wrieating.diary.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NutrientBalanceDto {

    private List<String> deficient; // 부족

    private List<String> appropriate; // 적절

    private List<String> excessive; // 초과


}
