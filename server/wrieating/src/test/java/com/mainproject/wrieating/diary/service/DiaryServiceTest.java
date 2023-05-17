// package com.mainproject.wrieating.diary.service;

// import com.mainproject.wrieating.diary.entity.Diary;
// import com.mainproject.wrieating.diary.repository.DiaryRepository;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.data.domain.*;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.Arrays;
// import java.util.List;
// import java.util.Optional;

// import static com.mainproject.wrieating.diary.entity.Diary.DiaryStatus.GOOD_EMOJI;
// import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


// @ExtendWith(MockitoExtension.class)
// public class DiaryServiceTest {
//     @Mock
//     private DiaryRepository diaryRepository;

//     @InjectMocks
//     private DiaryService diaryService;

//     //C
//     @Test
//     @DisplayName("diary 등록 테스트")
//     public void diaryCreateTest() {
//         //given
//         final long id = 1L;
//         final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

//         final Diary diary = Diary.builder()
//                 .diaryId(id)
//                 .userDate(LocalDate.of(2023,5,5))
//                 .memo("test")
//                 .comment("suggestion")
//                 .diaryStatus(GOOD_EMOJI)
//                 .createdAt(now)
//                 .modifiedAt(null)
//                 .build();

//         Mockito.when(diaryRepository.save(diary)).thenReturn(diary);

//         //when
//         Diary result = diaryService.createDiary(diary);

//         //then
//         assertThat(result).isNotNull();
//         assertThat(result.getDiaryId()).isEqualTo(id);
//         assertThat(result.getUserDate()).isEqualTo(LocalDate.of(2023,5,5));
//         assertThat(result.getMemo()).isEqualTo("test");
//         assertThat(result.getComment()).isEqualTo("suggestion");
//         assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
//         assertThat(result.getCreatedAt()).isEqualTo(now);
//         assertThat(result.getModifiedAt()).isNull();

//         // 로그
//         System.out.println("Diary created: " + result);
//     }

//     //R
//     @Test
//     @DisplayName("diary 조회 테스트")
//     public void diaryFindTest() {
//         //given
//         final long id = 1L;
//         final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);

//         final Diary diary = Diary.builder()
//                 .diaryId(id)
//                 .userDate(LocalDate.of(2023,5,5))
//                 .memo("test")
//                 .comment("suggestion")
//                 .diaryStatus(GOOD_EMOJI)
//                 .createdAt(now)
//                 .modifiedAt(null)
//                 .build();

//         Mockito.when(diaryRepository.findById(id)).thenReturn(Optional.of(diary));

//         //when
//         Diary result = diaryService.findDiary(id);

//         //then
//         assertThat(result).isNotNull();
//         assertThat(result.getDiaryId()).isEqualTo(id);
//         assertThat(result.getUserDate()).isEqualTo(LocalDate.of(2023,5,5));
//         assertThat(result.getMemo()).isEqualTo("test");
//         assertThat(result.getComment()).isEqualTo("suggestion");
//         assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
//         assertThat(result.getCreatedAt()).isEqualTo(now);
//         assertThat(result.getModifiedAt()).isNull();

//         // 로그
//         System.out.println("Diary find: " + result);
//     }

//     //R
//     @Test
//     @DisplayName("Diary 전체 조회 테스트")
//     public void diaryFindAllTest() {
// //        //given
// //        final long id = 1L;
// //        final LocalDateTime now = LocalDateTime.of(2023, 5, 10, 1, 22);
// //
// //        // 페이징 정보
// //        final Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "userDate"));
// //
// //        final Diary diary1 = Diary.builder()
// //                .diaryId(id)
// //                .userDate(LocalDate.of(2023, 5, 5))
// //                .memo("test1")
// //                .comment("suggestion1")
// //                .diaryStatus(GOOD_EMOJI)
// //                .createdAt(now)
// //                .modifiedAt(null)
// //                .build();
// //
// //        final Diary diary2 = Diary.builder()
// //                .diaryId(id + 1)
// //                .userDate(LocalDate.of(2023, 5, 6))
// //                .memo("test2")
// //                .comment("suggestion2")
// //                .diaryStatus(GOOD_EMOJI)
// //                .createdAt(now)
// //                .modifiedAt(null)
// //                .build();
// //
// //        final Diary diary3 = Diary.builder()
// //                .diaryId(id + 2)
// //                .userDate(LocalDate.of(2023, 5, 7))
// //                .memo("test3")
// //                .comment("suggestion3")
// ////                .diaryStatus(GOOD_EMOJI)
// ////                .createdAt(now)
// ////                .modifiedAt(null)
// ////                .build();
// //
// //        final List<Diary> diaryList = Arrays.asList(diary1, diary2, diary3);
// //        final Page<Diary> diaryPage = new PageImpl<>(diaryList, pageable, diaryList.size());
// //
// //        Mockito.when(diaryRepository.findAll(pageable)).thenReturn(diaryPage);
// //
// //        //when
// //        Page<Diary> result = diaryService.findAllDiaries(0,10);
// //
// //        //then
// //        assertThat(result).isNotNull();
// //        assertThat(result.getContent()).isNotNull();
// //        assertThat(result.getNumber()).isEqualTo(0);
// //        assertThat(result.getSize()).isEqualTo(10);
// //        assertThat(result.getTotalPages()).isEqualTo(1);
// //        assertThat(result.getTotalElements()).isEqualTo(3);
// //        assertThat(result.getContent().get(0)).isEqualTo(diary1);
// //        assertThat(result.getContent().get(1)).isEqualTo(diary2);
// //        assertThat(result.getContent().get(2)).isEqualTo(diary3);
// //
// //        // 로그
// //        System.out.println("Diary find All - content: " + result.getContent());
// //        System.out.println("Diary find All - number: " + result.getNumber());
// //        System.out.println("Diary find All - size: " + result.getSize());
// //        System.out.println("Diary find All - totalPages: " + result.getTotalPages());
// //        System.out.println("Diary find All - totalElements: " + result.getTotalElements());
//     }

//     //U
//     @Test
//     @DisplayName("diary 수정 테스트")
//     public void diaryUpdateTest() {
//         //given
// //        final long id = 1L;
// //        final LocalDateTime now = LocalDateTime.of(2023,5,10,1,22);
// //
// //        final Diary diary = Diary.builder()
// //                .diaryId(id)
// //                .userDate(LocalDate.of(2023,5,5))
// //                .memo("test")
// //                .comment("suggestion")
// //                .diaryStatus(GOOD_EMOJI)
// //                .createdAt(now)
// //                .modifiedAt(null)
// //                .build();

//         // 로그 - 수정 전
// //        System.out.println("Diary Legacy: " + diary);
// //
// //        // findById() 메소드에 대한 반환값 지정
// //        Mockito.when(diaryRepository.save(diary)).thenReturn(diary); // 저장
// //        Mockito.when(diaryRepository.findById(id)).thenReturn(Optional.of(diary)); // 조회 시

//         //when
//         final Diary update = Diary.builder().diaryId(id).memo("updateTest").build();
// //        Diary result = diaryService.updateDiary(id,update);

//         //then
// //        assertThat(result).isNotNull();
// //        assertThat(result.getDiaryId()).isEqualTo(id);
// //        assertThat(result.getUserDate()).isEqualTo(LocalDate.of(2023,5,5));
// //        assertThat(result.getMemo()).isEqualTo("updateTest");
// //        assertThat(result.getComment()).isEqualTo("suggestion");
// //        assertThat(result.getDiaryStatus()).isEqualTo(GOOD_EMOJI);
// //        assertThat(result.getCreatedAt()).isEqualTo(now);
// //        assertThat(result.getModifiedAt()).isNull();

//         // 로그 - 수정 후
// //        System.out.println("Diary update: " + result);
//     }

//     //D
//     @Test
//     @DisplayName("diary 삭제 테스트")
//     public void diaryDeleteTest() {
//         //given
//         final long id = 1L;

//         //when
//         diaryService.deleteDiary(id);

//         //then - 삭제 후 객체가 비어있는지 검증
//         final Optional<Diary> deletedDiary = diaryRepository.findById(id);
//         assertThat(deletedDiary).isEmpty();

//         System.out.println("Diary delete: " + deletedDiary);
//     }
// }
