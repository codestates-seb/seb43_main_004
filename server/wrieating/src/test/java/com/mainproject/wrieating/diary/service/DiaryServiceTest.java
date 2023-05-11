package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.mainproject.wrieating.diary.entity.Diary.DiaryStatus.GOOD_EMOJI;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD) // 데이터베이스 롤백
public class DiaryServiceTest {
    @Mock
    private DiaryRepository diaryRepository;

    @InjectMocks
    private DiaryService diaryService;

    //C
    @Test
    @DisplayName("diary 등록 테스트")
    public void diaryCreateTest() {
        //given
        final Long id = 1L;
        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

        final Diary diary = Diary.builder()
                .diaryId(id)
                .memberId(id)
                .recipeId(id)
                .userDate(now)
                .memo("test")
                .comment("suggestion")
                .diaryStatus(GOOD_EMOJI)
                .createdAt(now)
                .modifiedAt(null)
                .build();

        Mockito.when(diaryRepository.save(diary)).thenReturn(diary);

        //when
        Diary result = diaryService.createDiary(diary);

        //then
        assertThat(result).isNotNull();
        assertThat(result.getDiaryId()).isEqualTo(id);
        assertThat(result.getMemberId()).isEqualTo(id);
        assertThat(result.getRecipeId()).isEqualTo(id);
        assertThat(result.getUserDate()).isEqualTo(now);
        assertThat(result.getMemo()).isEqualTo("test");
        assertThat(result.getComment()).isEqualTo("suggestion");
        assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
        assertThat(result.getCreatedAt()).isEqualTo(now);
        assertThat(result.getModifiedAt()).isNull();
    }

    //R
    @Test
    @DisplayName("diary 조회 테스트")
    public void diaryFindTest() {
        //given
        final Long id = 1L;
        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

        final Diary diary = Diary.builder()
                .diaryId(id)
                .memberId(id)
                .recipeId(id)
                .userDate(now)
                .memo("test")
                .comment("suggestion")
                .diaryStatus(GOOD_EMOJI)
                .createdAt(now)
                .modifiedAt(null)
                .build();

        Mockito.when(diaryRepository.findById(id)).thenReturn(Optional.of(diary));

        //when
        Diary result = diaryService.findDiary(id);

        //then
        assertThat(result).isNotNull();
        assertThat(result.getDiaryId()).isEqualTo(id);
        assertThat(result.getMemberId()).isEqualTo(id);
        assertThat(result.getRecipeId()).isEqualTo(id);
        assertThat(result.getUserDate()).isEqualTo(now);
        assertThat(result.getMemo()).isEqualTo("test");
        assertThat(result.getComment()).isEqualTo("suggestion");
        assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
        assertThat(result.getCreatedAt()).isEqualTo(now);
        assertThat(result.getModifiedAt()).isNull();
    }

    //U
    @Test
    @DisplayName("diary 수정 테스트")
    public void diaryUpdateTest() {
        //given
        //when
        //then
    }

    //D
    @Test
    @DisplayName("diary 삭제 테스트")
    public void diaryDeleteTest() {
        //given
        //when
        //then
    }
}
