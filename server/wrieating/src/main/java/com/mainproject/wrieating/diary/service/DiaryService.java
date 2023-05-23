package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.dataArchive.repository.RecipeArchiveRepository;
import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.meal.entity.Day;
import com.mainproject.wrieating.meal.entity.Week;
import com.mainproject.wrieating.meal.repository.MealRepository;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.entity.StandardIntake;
import com.mainproject.wrieating.member.repository.StandardIntakeRepository;
import com.mainproject.wrieating.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryMapper mapper;
    private final JwtTokenizer tokenizer;
    private final MemberService memberService;
    private final MealRepository mealRepository;
    private final RecipeArchiveRepository recipeRepository;
    private final StandardIntakeRepository standardIntakeRepository;

    public DiaryPostResponseDto createDiary(String token, DiaryPostDto diaryPostDto) {
        Diary diary = mapper.diaryPostDtoToDiary(diaryPostDto);

        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token));

        diary.setMember(member);

        Diary response = diaryRepository.save(diary);

        return mapper.diaryToDiaryPostResponseDto(response);
    }

    public DiaryResponseDto findDiary(String token,Long diaryId) {
        Diary diary = findVerifiedDiary(diaryId); //다이어리 아이디 있나 검증
        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token)); // 토큰으로 멤버있나 검증
        verifiedRequest(diary.getMember().getMemberId(), member.getMemberId()); // 가져온 멤버랑 다이어리쓴 멤버랑 검증

        DiaryResponseDto responseDto = mapper.diaryToDiaryResponseDto(diary); // 매퍼보기
        Day summery = mealRepository.getMealSummaryByDiaryId(diaryId); // 레포지토리 보기
        responseDto.setDayList(Collections.singletonList(summery)); // Summery 값 대입

        return responseDto;
    }

    public Page<Diary> findAllDiaries(String token,int page, int size) {
        long memberId = tokenizer.getMemberId(token);
        return  diaryRepository.findAllByMemberMemberId(memberId,
                PageRequest.of(page, size, Sort.by("userDate").descending()));
    }


    public void updateDiary(long diaryId, DiaryPatchDto diaryPatchDto) {
        Diary findDiary = findVerifiedDiary(diaryId);

        Optional.ofNullable(diaryPatchDto.getMemo()) // patch mapper 삭제
                .ifPresent(findDiary::setMemo);
        Optional.ofNullable(diaryPatchDto.getDiaryStatus()) // 이모지 String 은 수정 시
                .ifPresent(findDiary::setDiaryStatus);

        diaryRepository.save(findDiary);
    }

    public void deleteDiary(long diaryId) {
        diaryRepository.deleteById(diaryId);
    }

    // meal 에서 사용할 것
    public Diary findVerifiedDiary(long diaryId) { // 다이어리 아이디 있나 검증
        return diaryRepository.findById(diaryId)
                .orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND)
                );
    }

    private void verifiedRequest(long diaryMemberId, long compareId) { // 다이어리 멤버랑 비교해서 일치하는지
        if (diaryMemberId != compareId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED);
        }
    }
}