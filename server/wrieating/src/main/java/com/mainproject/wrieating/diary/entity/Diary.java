package com.mainproject.wrieating.diary.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long diaryId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long recipeId;

    @Column(nullable = false)
    private LocalDateTime userDate;

    @Column(nullable = true)
    private String memo;

    @Column(nullable = true)
    private String comment;

    @Enumerated(EnumType.STRING)
    private DiaryStatus diaryStatus;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = true)
    private LocalDateTime modifiedAt;

    public enum DiaryStatus {
        GOOD_EMOJI("웃는 이모지");

        @Getter
        private String status;

        DiaryStatus(String status) {
            this.status = status;
        }
    }
}
