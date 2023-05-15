package com.mainproject.wrieating.diary.controller;

import com.mainproject.wrieating.diary.dto.DiaryPatchDto;
import com.mainproject.wrieating.diary.dto.DiaryPostDto;
import com.mainproject.wrieating.diary.dto.MultiResponseDto;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.service.DiaryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/diaries")
@AllArgsConstructor
@Validated
@Slf4j
public class DiaryController {
    private final DiaryMapper mapper;
    private final DiaryService service;

    @PostMapping("/write")
    @ResponseStatus(HttpStatus.CREATED)
    public void postDiary(@Validated @RequestBody DiaryPostDto diaryPostDto) {
        service.createDiary(diaryPostDto);
    }

    @GetMapping("/{diaries-id}")
    public ResponseEntity getDiary(@Positive @PathVariable("diaries-id") long diaryId) {
        Diary response = service.findDiary(diaryId);
        return new ResponseEntity<>(mapper.diaryToDiaryResponseDto(response),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getDiaries(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Diary> pageDiaries = service.findAllDiaries(page - 1, size);
        List<Diary> diaries = pageDiaries.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.DiariesToDiariesResponseDto(diaries), pageDiaries),
                        HttpStatus.OK);
    }

    @PatchMapping("/update/{diaries-id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateDiary(@PathVariable("diaries-id") @Positive long diaryId,
                            @Validated @RequestBody DiaryPatchDto diaryPatchDto) {
        service.updateDiary(diaryId,diaryPatchDto);
    }

    @DeleteMapping("/delete/{diaries-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDiary(@PathVariable("diaries-id") @Positive long diaryId) {
        service.deleteDiary(diaryId);
    }
}
