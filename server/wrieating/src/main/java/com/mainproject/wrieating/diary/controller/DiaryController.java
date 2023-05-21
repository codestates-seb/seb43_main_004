package com.mainproject.wrieating.diary.controller;

import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.service.DiaryService;
import com.mainproject.wrieating.dto.MultiResponseDto;
import com.mainproject.wrieating.dto.MultiResponseDto2;
import com.mainproject.wrieating.dto.PageInfo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
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
    public void postDiary(@RequestHeader(name = "Authorization") String token,
                          @Validated @RequestBody DiaryPostDto diaryPostDto) {
        service.createDiary(token,diaryPostDto);
    }

    @GetMapping("/{diaries-id}")
    public ResponseEntity getDiary(@RequestHeader(name = "Authorization") String token,
                                   @Positive @PathVariable("diaries-id") Long diaryId) {
        DiaryResponseDto response = service.findDiary(token,diaryId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto2<DiariesResponseDto>> getAllDiaries(@RequestHeader(name = "Authorization") String token,
                                                                               @Positive @RequestParam int page,
                                                                               @Positive @RequestParam int size) {
        MultiResponseDto2<DiariesResponseDto> responseDto = service.findAllDiaries(token, page - 1, size);

        List<DiariesResponseDto> diaryList = responseDto.getData();
        PageInfo pageInfo = responseDto.getPageInfo();

        List<StandardIntakeDto> standardIntakeList = responseDto.getStandardIntake();
        List<WeekResponseDto> weekList = responseDto.getWeekList();

        return ResponseEntity.ok(new MultiResponseDto2<>(
                diaryList,
                standardIntakeList,
                weekList,
                pageInfo
        ));
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
