package com.mainproject.wrieating.diary.controller;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.dataArchive.dto.RecipesResponseDto;
import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.diary.service.DiaryService;
import com.mainproject.wrieating.dto.MultiResponseDto;
import com.mainproject.wrieating.meal.entity.Day;
import com.mainproject.wrieating.meal.entity.Week;
import com.mainproject.wrieating.meal.repository.MealRepository;
import com.mainproject.wrieating.member.entity.StandardIntake;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/diaries")
@AllArgsConstructor
@Validated
@Slf4j
public class DiaryController {
    private final DiaryMapper mapper;
    private final DiaryService service;
    private final MealRepository mealRepository;
    private final JwtTokenizer tokenizer;

    @PostMapping("/write")
    public ResponseEntity postDiary(@RequestHeader(name = "Authorization") String token,
                          @Validated @RequestBody DiaryPostDto diaryPostDto) {
        DiaryPostResponseDto responseDto = service.createDiary(token,diaryPostDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping("/{diaries-id}")
    public ResponseEntity getDiary(@RequestHeader(name = "Authorization") String token,
                                   @Positive @PathVariable("diaries-id") Long diaryId) {
        DiaryResponseDto response = service.findDiary(token,diaryId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/recommend-recipe")
    public ResponseEntity recipeRecommend(@RequestBody NutrientBalanceDto nutrientBalanceDto) {
        List<String> deficientNutrients = nutrientBalanceDto.getDeficient();
        List<String> appropriateNutrients = nutrientBalanceDto.getAppropriate();
        List<String> excessiveNutrients = nutrientBalanceDto.getExcessive();

        List<String> filteredDeficientNutrients = service.filterTotalPrefix(deficientNutrients);
        List<String> filteredAppropriateNutrients = service.filterTotalPrefix(appropriateNutrients);
        List<String> filteredExcessiveNutrients = service.filterTotalPrefix(excessiveNutrients);


        List<RecipesResponseDto> response = service.recommendRecipesByNutrientBalance(filteredDeficientNutrients, filteredAppropriateNutrients, filteredExcessiveNutrients);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity getDiaries(@RequestHeader(name = "Authorization") String token,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Diary> pageDiaries = service.findAllDiaries(token, page - 1, size);
        List<Diary> diaries = pageDiaries.getContent();

        // TODO: 2023-05-21 전부 서비스로 리펙토링 필요
        long memberId = tokenizer.getMemberId(token);
        List<Week> previousWeeks = Collections.singletonList(previousWeek(memberId));
        List<WeekResponseDto> weekResponseDtos = mapper.weekToWeekResponseDtos(previousWeeks);

        // 다이어리가 아예 없는 회원의 경우도 있음
        if (diaries.isEmpty()) {
            return new ResponseEntity<>(
                    new MultiDiaryResponseDto<>(mapper.diariesToDiariesResponseDto(diaries), pageDiaries,
                            weekResponseDtos), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                    new MultiDiaryResponseDto<>(mapper.diariesToDiariesResponseDto(diaries), pageDiaries,
                            mapper.standardIntakeToStandardIntakeDtos(diaries.get(0).getMember().getStandardIntakes()),
                            weekResponseDtos), HttpStatus.OK);
        }
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

    // TODO: 2023-05-22 서비스에 들어가야하는 로직임 
    private Week previousWeek(long memberId) {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfCurrentWeek = currentDate.with(java.time.DayOfWeek.MONDAY);
        LocalDate endOfCurrentWeek = currentDate.with(java.time.DayOfWeek.SUNDAY);

        LocalDate startOfPreviousWeek = startOfCurrentWeek.minusDays(7); // 전주 월
        LocalDate endOfPreviousWeek = endOfCurrentWeek.minusDays(7); // 전주 일


        Week previousWeekData = mealRepository.getPreviousWeekData(memberId, startOfPreviousWeek, endOfPreviousWeek);

        // TODO: 2023-05-22 week에 null 이 들어간 경우 mapper에서 npe 발생, 아래가 처리인데 근본적인 문제해결 필요
        if (previousWeekData.getSumKcal() == null && previousWeekData.getAvgKcal() == null &&
        previousWeekData.getAvgFat() == null && previousWeekData.getAvgCarbohydrate() == null
        && previousWeekData.getAvgSalt() == null && previousWeekData.getAvgSugar() == null &&
        previousWeekData.getAvgProtein() == null) {
            Week week = new Week();
            week.setSumKcal(0L);
            week.setAvgKcal(0.0);
            week.setAvgCarbohydrate(0.0);
            week.setAvgFat(0.0);
            week.setAvgSalt(0.0);
            week.setAvgProtein(0.0);
            week.setAvgSugar(0.0);

            return week;
        }

        return previousWeekData;
    }
}
