package com.mainproject.wrieating.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StandardIntakeResponseDto {
    private Long intakeId;
    private Long memberId;
    private double kcal;
    private double carbohydrate;
    private double protein;
    private double fat;
    private double sugar;
    private double salt;
}
