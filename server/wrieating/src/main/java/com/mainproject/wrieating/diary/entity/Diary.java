package com.mainproject.wrieating.diary.entity;

import com.mainproject.wrieating.audit.Auditable;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString // 상세 데이터 로그 출력용
@Builder
@Table
public class Diary extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @Column(nullable = false)
    private LocalDate userDate;

    @Column
    private String memo;

    @Column
    private String comment = "참 잘했어요 하하.";

    @Column
    private String diaryStatus;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Meal> mealList = new ArrayList<>();


    // TODO: 2023-05-16 food랑 recipe 연결해야뎀
}
