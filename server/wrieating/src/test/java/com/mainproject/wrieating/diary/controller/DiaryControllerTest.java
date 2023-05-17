// package com.mainproject.wrieating.diary.controller;

// import com.google.gson.Gson;
// import com.mainproject.wrieating.diary.dto.*;
// import com.mainproject.wrieating.diary.entity.Diary;
// import com.mainproject.wrieating.diary.mapper.DiaryMapper;
// import com.mainproject.wrieating.diary.service.DiaryService;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.data.domain.*;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.stream.Collectors;

// import static org.mockito.ArgumentMatchers.*;
// import static org.mockito.BDDMockito.given;
// import static org.mockito.Mockito.doNothing;
// import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// @WebMvcTest(DiaryController.class)
// @ExtendWith(MockitoExtension.class)
// public class DiaryControllerTest {
//     @MockBean
//     private DiaryService service;
//     @MockBean
//     private DiaryMapper mapper;
//     @Autowired
//     private MockMvc mockMvc;
//     @Autowired
//     private Gson gson;
//     private final String userDate = "2023-5-11";

//     @Test
//     @DisplayName("Diary 등록 테스트")
//     public void PostDiaryTest() throws Exception {
//         //given
//         DiaryPostDto postDto = DiaryPostDto.builder()
//                 .userDate(userDate)
//                 .memo("test")
//                 .build();
//         String content = gson.toJson(postDto);

//         given(mapper.diaryPostDtoToDiary(any())).willReturn(new Diary());
//         given(service.createDiary(any())).willReturn(new Diary());

//         //when
//         mockMvc.perform(
//                 post("/diaries/write")
//                         .accept(MediaType.APPLICATION_JSON)
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(content)
//         )
//                 //then
//                 .andExpect(status().isCreated())
//                 .andDo(print());
//     }

//     @Test
//     @DisplayName("Diary 조회 테스트")
//     public void getDiaryTest() throws Exception {
//         //given
//         Long diaryId = 1L;

//         Diary diary = Diary.builder()
//                 .diaryId(diaryId)
//                 .userDate(LocalDate.of(2022, 5, 12))
//                 .memo("test")
//                 .diaryStatus(Diary.DiaryStatus.GOOD_EMOJI)
//                 .comment("script")
//                 .build();

//         DiaryResponseDto responseDto = DiaryResponseDto.builder()
//                 .diaryId(diaryId)
//                 .userDate(userDate)
//                 .memo("test")
//                 .diaryStatus(Diary.DiaryStatus.GOOD_EMOJI)
//                 .comment("script")
//                 .build();

//         given(service.findDiary(diaryId)).willReturn(diary);
//         given(mapper.diaryToDiaryResponseDto(diary)).willReturn(responseDto);

//         //when
//         mockMvc.perform(
//                 get("/diaries/{diary-id}", diaryId)
//                         .accept(MediaType.APPLICATION_JSON)
//                         .contentType(MediaType.APPLICATION_JSON)
//         )
//                 //then
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.diaryId").value(responseDto.getDiaryId()))
//                 .andExpect(jsonPath("$.userDate").value(responseDto.getUserDate()))
//                 .andExpect(jsonPath("$.diaryStatus").value(responseDto.getDiaryStatus().toString()))
//                 .andExpect(jsonPath("$.comment").value(responseDto.getComment()))
//                 .andDo(print());
//     }

//     @Test
//     @DisplayName("Diary 전체 조회 테스트")
//     public void getAllDiaryTest() throws Exception {
//         // given
//         List<Diary> diaries = new ArrayList<>();
//         Diary diary1 = Diary.builder().diaryId(1L).userDate(LocalDate.parse("2022-05-01")).diaryStatus(Diary.DiaryStatus.GOOD_EMOJI).build();
//         Diary diary2 = Diary.builder().diaryId(2L).userDate(LocalDate.parse("2022-05-02")).diaryStatus(Diary.DiaryStatus.GOOD_EMOJI).build();
//         Diary diary3 = Diary.builder().diaryId(3L).userDate(LocalDate.parse("2022-05-03")).diaryStatus(Diary.DiaryStatus.GOOD_EMOJI).build();
//         diaries.add(diary1);
//         diaries.add(diary2);
//         diaries.add(diary3);

//         Pageable pageable = PageRequest.of(0, 10, Sort.by("userDate").descending());
//         Page<Diary> diaryPage = new PageImpl<>(diaries, pageable, diaries.size());
//         given(service.findAllDiaries(anyInt(), anyInt())).willReturn(diaryPage);

//         // when, then
//         List<DiariesResponseDto> expectedDiariesResponseDtos = diaryPage.getContent().stream()
//                 .map(mapper::diariesResponseDto)
//                 .collect(Collectors.toList());
//         MultiResponseDto<DiariesResponseDto> expectedMultiResponseDto = new MultiResponseDto<>(
//                 expectedDiariesResponseDtos, diaryPage
//         );
//         // when, then
//         mockMvc.perform(
//                         get("/diaries")
//                                 .param("page", "1")
//                                 .param("size", "10")
//                                 .accept(MediaType.APPLICATION_JSON)
//                 )
//                 .andExpect(status().isOk())
//                 .andDo(print());
//     }

//     @Test
//     @DisplayName("Diary 수정 테스트")
//     public void patchDiaryTest() throws Exception {
//         //given
//         final DiaryPatchDto patchDto = new DiaryPatchDto("test script");
//         String content = gson.toJson(patchDto);

// //        given(mapper.dairyPatchDtoToDiary(any())).willReturn(new Diary());
// //        given(service.updateDiary(anyLong(),any())).willReturn(new Diary());

//         mockMvc.perform(
//                 patch("/diaries/update/{diaries-id}",1L)
//                         .accept(MediaType.APPLICATION_JSON)
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .content(content)
//         )
//                 .andExpect(status().isOk())
//                 .andDo(print());
//     }

//     @Test
//     @DisplayName("Diary 삭제 테스트")
//     public void deleteDiaryTest() throws Exception {

//         doNothing().when(service).deleteDiary(1L);

//         mockMvc.perform(
//                 delete("/diaries/delete/{diaries-id}", 1L)
//                         .accept(MediaType.APPLICATION_JSON)
//         )
//                 .andExpect(status().isNoContent())
//                 .andDo(print());
//     }
// }
