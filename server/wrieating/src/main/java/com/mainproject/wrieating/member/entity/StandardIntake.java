package com.mainproject.wrieating.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StandardIntake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long intakeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @Column(nullable = false)
    private double kcal;

    @Column(nullable = false)
    private double carbohydrate;

    @Column(nullable = false)
    private double protein;

    @Column(nullable = false)
    private double fat;

    @Column(nullable = false)
    private double sugar;

    @Column(nullable = false)
    private double salt;
}
