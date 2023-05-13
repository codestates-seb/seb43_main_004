package com.mainproject.wrieating.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDate birth;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private Integer height;

    @Column(nullable = false)
    private Integer weight;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Activity activity;  //회원의 활동량

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Status status;      //탈퇴유무

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Activity{
        NONE_ACTIVITY("운동 전혀 안함"),
        LOW_ACTIVITY("매우 조금 운동함"),
        MIDDLE_ACTIVITY("약간 운동함"),
        HIGH_ACTIVITY("많이 운동함");

        @Getter
        private String activity;

        Activity(String activity){
            this.activity = activity;
        }
    }

    public enum Status{
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        Status(String status){
            this.status = status;
        }
    }

    public Member(Long memberId, String email, String nickName, String password, LocalDate birth,
                  String gender, Integer height, Integer weight, Activity activity) {
        this.memberId = memberId;
        this.email = email;
        this.nickName = nickName;
        this.password = password;
        this.birth = birth;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activity = activity;
    }
}