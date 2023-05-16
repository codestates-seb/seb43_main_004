package com.mainproject.wrieating.diary.entity;

import com.mainproject.wrieating.audit.Auditable;
import com.mainproject.wrieating.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

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
    private String comment;

    @Column
    private String diaryStatus;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    // TODO: 2023-05-16 food랑 recipe 연결해야뎀
}
