package com.mainproject.wrieating.diary.repository;

import com.mainproject.wrieating.diary.entity.Diary;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.mainproject.wrieating.diary.entity.Diary.DiaryStatus.GOOD_EMOJI;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD) // 데이터베이스 롤백
public class DiaryRepositoryTest {
    @Autowired
    private DiaryRepository diaryRepository;

    @Test
    @DisplayName("Diary Repository 정상 작동 테스트")
    public void DiaryRepositoryIsNotNull() {
        assertThat(diaryRepository).isNotNull();
    }

    @Test
    @DisplayName("Diary Repository 일기 등록 테스트")
    public void DiaryPostTest() {
        final Long id = 1L;
        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

        //given
        final Diary diary = Diary.builder()
                .diaryId(id)
                .userDate(LocalDate.of(2023,5,5))
                .memo("test")
                .comment("suggestion")
                .diaryStatus(GOOD_EMOJI)
                .createdAt(now)
                .modifiedAt(null)
                .build();

        // when
        final Diary result = diaryRepository.save(diary);

        // then
        assertThat(result.getDiaryId()).isEqualTo(id);
        assertThat(result.getUserDate()).isEqualTo(LocalDate.of(2023,5,5));
        assertThat(result.getMemo()).isEqualTo("test");
        assertThat(result.getComment()).isEqualTo("suggestion");
        assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
        assertThat(result.getCreatedAt()).isEqualTo(now);
        assertThat(result.getModifiedAt()).isNull();
    }

    @Test
    @DisplayName("Diary Repository 조회 테스트")
    public void DiaryPostExistTest() {
        //given
        final Long id = 1L;
        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

        final Diary diary = Diary.builder()
                .diaryId(id)
                .userDate(LocalDate.of(2023,5,5))
                .memo("test")
                .comment("suggestion")
                .diaryStatus(GOOD_EMOJI)
                .createdAt(now)
                .modifiedAt(null)
                .build();

        //when
        diaryRepository.save(diary);
        final Diary findResult = diaryRepository.findByUserDate(LocalDate.of(2023,5,5));

        //then
        assertThat(findResult).isNotNull();
        assertThat(findResult.getDiaryId()).isEqualTo(id);
        assertThat(findResult.getUserDate()).isEqualTo(LocalDate.of(2023,5,5));
        assertThat(findResult.getMemo()).isEqualTo("test");
        assertThat(findResult.getComment()).isEqualTo("suggestion");
        assertThat(findResult.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
        assertThat(findResult.getCreatedAt()).isEqualTo(now);
        assertThat(findResult.getModifiedAt()).isNull();
    }

    @Test
    @DisplayName("Diary Repository 삭제 테스트")
    public void DiaryDeleteTest() {
        //given
        final Long id = 1L;
        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

        final Diary diary = Diary.builder()
                .diaryId(id)
                .userDate(LocalDate.of(2023,5,5))
                .memo("test")
                .comment("suggestion")
                .diaryStatus(GOOD_EMOJI)
                .createdAt(now)
                .modifiedAt(null)
                .build();

        diaryRepository.save(diary);

        //when
        diaryRepository.deleteById(id);

        //then
        assertThat(diaryRepository.findById(id)).isEmpty();
    }
}

