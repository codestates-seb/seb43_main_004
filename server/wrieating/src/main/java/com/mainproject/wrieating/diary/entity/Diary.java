package com.mainproject.wrieating.diary.entity;

import com.mainproject.wrieating.audit.Auditable;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Enumerated(EnumType.STRING)
    private DiaryStatus diaryStatus;

    public enum DiaryStatus {
        GOOD_EMOJI("웃는 이모지");

        @Getter
        private String status;

        DiaryStatus(String status) {
            this.status = status;
        }
    }
}
