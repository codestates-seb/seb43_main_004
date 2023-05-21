package com.mainproject.wrieating.member.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StandardIntakeResponseDto {
    private Long intakeId;
    private Long memberId;
    private Integer kcal;
    private Integer carbohydrate;
    private Integer protein;
    private Integer fat;
    private Integer sugar;
    private Integer salt;
}
