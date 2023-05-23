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


    public void createDiary(String token, DiaryPostDto diaryPostDto) {
        Diary diary = mapper.diaryPostDtoToDiary(diaryPostDto);

        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token));

        diary.setMember(member);

        diaryRepository.save(diary);
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


    private Diary findVerifiedDiary(long diaryId) { // 다이어리 아이디 있나 검증
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


    public RecipeData recommendRecipeData(List<String> nutrients) {

        // 클라이언트로부터 받은 성분들을 기반으로 쿼리를 생성
        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("SELECT rd.* FROM recipedata rd ");

        for (int i = 0; i < nutrients.size(); i++) {
            String nutrient = nutrients.get(i);
            int minValue = 0;

            // 각 성분에 따른 최소값을 설정
            switch (nutrient) {
                case "kcal":
                    minValue = 500;
                    break;
                case "carbohydrate":
                    minValue = 32;
                    break;
                case "protein":
                    minValue = 15;
                    break;
                case "fat":
                    minValue = 20;
                    break;
                case "natrium ":
                    minValue = 600;
                    break;

            }

            if (i == 0) {
                queryBuilder.append("WHERE ");
            } else {
                queryBuilder.append("AND ");
            }

            queryBuilder.append("rd.").append(nutrient).append(" >= ").append(minValue);
        }

        queryBuilder.append(" ORDER BY RAND() LIMIT 1");

        // 쿼리를 실행하여 추천 음식 성분 데이터를 조회합니다.
        String query = queryBuilder.toString();
        RecipeData recommendedRecipeData = recipeRepository.findRandomRecipeDataWithCustomQuery(query);

        return recommendedRecipeData;
    }
}
