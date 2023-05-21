package com.mainproject.wrieating.member.entity;

import com.mainproject.wrieating.meal.entity.Meal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
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
    private String icon;

    // JWT
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<StandardIntake> standardIntakes = new ArrayList<>();

    public enum Activity{
        NONE_ACTIVE("매우 낮음"), // BMR * 1.2
        LIGHTLY_ACTIVE("낮음"), // BMR * 1.375
        MODERATELY_ACTIVE("보통"), // BMR * 1.55
        VERY_ACTIVE("높음"), // BMR * 1.725
        EXTREMELY_ACTIVE("매우 높음"); // BMR * 1.9

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
}