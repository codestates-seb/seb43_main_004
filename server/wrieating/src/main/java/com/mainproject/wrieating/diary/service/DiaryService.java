package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.dataArchive.dto.RecipesResponseDto;
import com.mainproject.wrieating.dataArchive.repository.RecipeArchiveRepository;
import com.mainproject.wrieating.diary.dto.*;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.meal.entity.Day;
import com.mainproject.wrieating.meal.repository.MealRepository;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.repository.StandardIntakeRepository;
import com.mainproject.wrieating.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

@Service
@AllArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryMapper mapper;
    private final JwtTokenizer tokenizer;
    private final MemberService memberService;
    private final MealRepository mealRepository;
    private final RecipeArchiveRepository recipeArchiveRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public DiaryPostResponseDto createDiary(String token, DiaryPostDto diaryPostDto) {
        Diary diary = mapper.diaryPostDtoToDiary(diaryPostDto);

        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token));

        diary.setMember(member);

        Diary response = diaryRepository.save(diary);

        return mapper.diaryToDiaryPostResponseDto(response);
    }

    public DiaryResponseDto findDiary(String token, Long diaryId) {
        Diary diary = findVerifiedDiary(diaryId); //다이어리 아이디 있나 검증
        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token)); // 토큰으로 멤버있나 검증
        verifiedRequest(diary.getMember().getMemberId(), member.getMemberId()); // 가져온 멤버랑 다이어리쓴 멤버랑 검증

        DiaryResponseDto responseDto = mapper.diaryToDiaryResponseDto(diary); // 매퍼보기
        Day summery = mealRepository.getMealSummaryByDiaryId(diaryId); // 레포지토리 보기
        responseDto.setDayList(Collections.singletonList(summery)); // Summery 값 대입

        return responseDto;
    }

    public Page<Diary> findAllDiaries(String token, int page, int size) {
        long memberId = tokenizer.getMemberId(token);
        return diaryRepository.findAllByMemberMemberId(memberId,
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

    // 추천 레시피 동적 쿼리 생성
    public List<RecipesResponseDto> recommendRecipesByNutrientBalance(List<String> deficientNutrients, List<String> appropriateNutrients, List<String> excessiveNutrients) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<RecipeData> query = cb.createQuery(RecipeData.class);
        Root<RecipeData> root = query.from(RecipeData.class);

        List<Predicate> predicates = new ArrayList<>();

        // 부족한 성분에 대한 조건식 추가
        for (String nutrient : deficientNutrients) {
            Predicate predicate = createDeficientNutrientPredicate(cb, root, nutrient);
            predicates.add(predicate);
        }

        // 적절한 성분에 대한 조건식 추가
        for (String nutrient : appropriateNutrients) {
            Predicate predicate = createAppropriateNutrientPredicate(cb, root, nutrient);
            predicates.add(predicate);
        }

        // 과다한 성분에 대한 조건식 추가
        for (String nutrient : excessiveNutrients) {
            Predicate predicate = createExcessiveNutrientPredicate(cb, root, nutrient);
            predicates.add(predicate);
        }

        Predicate finalPredicate = cb.and(predicates.toArray(new Predicate[0]));

        query.where(finalPredicate);

        TypedQuery<RecipeData> typedQuery = entityManager.createQuery(query);

        List<RecipeData> recommendedRecipeData = typedQuery.getResultList();


        // 추천할 레시피가 없다면 전체 레시피데이터를 넣고
        if(recommendedRecipeData.isEmpty()){
            List<RecipeData> recipeData = recipeArchiveRepository.findAll();

            recommendedRecipeData = recipeData;
        }

        // 섞은 후 3개만큼 랜덤하게 추출한다.
        Collections.shuffle(recommendedRecipeData);
        int limit = 3;
        List<RecipeData> randomResults = recommendedRecipeData.subList(0, Math.min(limit, recommendedRecipeData.size()));

        List<RecipesResponseDto> recipesResponseList = new ArrayList<>();

        for (RecipeData recipeData : randomResults) {
            RecipesResponseDto recipesResponseDto = new RecipesResponseDto();
            recipesResponseDto.setRecipeId(recipeData.getRecipeId());
            recipesResponseDto.setRcpName(recipeData.getRcpName());
            recipesResponseDto.setImg(recipeData.getImg());
            recipesResponseList.add(recipesResponseDto);
        }

        return recipesResponseList;
    }

    // 부족한 성분에 대한 조건식 생성
    private Predicate createDeficientNutrientPredicate(CriteriaBuilder cb, Root<RecipeData> root, String nutrient) {
        // 성분에 따른 최소값 설정
        int minValue = 0;
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
                minValue = 13;
                break;
            case "salt":
                minValue = 600;
                break;
        }

        // 조건식 생성
        return cb.greaterThanOrEqualTo(root.get(nutrient), minValue);
    }

    // 적절한 성분에 대한 조건식 생성
    private Predicate createAppropriateNutrientPredicate(CriteriaBuilder cb, Root<RecipeData> root, String nutrient) {
        // 성분에 따른 범위 설정
        int minValue = 0;
        int maxValue = 0;
        switch (nutrient) {
            case "kcal":
                minValue = 250;
                maxValue = 500;
                break;
            case "carbohydrate":
                minValue = 12;
                maxValue = 32;
                break;
            case "protein":
                minValue = 8;
                maxValue = 15;
                break;
            case "fat":
                minValue = 6;
                maxValue = 13;
                break;
            case "salt":
                minValue = 240;
                maxValue = 600;
                break;
        }

        // 조건식 생성
        return cb.between(root.get(nutrient), minValue, maxValue);
    }

    // 과다한 성분에 대한 조건식 생성
    private Predicate createExcessiveNutrientPredicate(CriteriaBuilder cb, Root<RecipeData> root, String nutrient) {
        // 성분에 따른 최대값 설정
        int maxValue = 0;
        switch (nutrient) {
            case "kcal":
                maxValue = 250;
                break;
            case "carbohydrate":
                maxValue = 12;
                break;
            case "protein":
                maxValue = 8;
                break;
            case "fat":
                maxValue = 6;
                break;
            case "salt":
                maxValue = 240;
                break;
        }

        // 조건식 생성
        return cb.lessThanOrEqualTo(root.get(nutrient), maxValue);
    }


    // "total" 접두사 필터링 메서드
    public List<String> filterTotalPrefix(List<String> nutrients) {
        List<String> filteredNutrients = new ArrayList<>();
        for (String nutrient : nutrients) {
            String filteredNutrient = nutrient.replace("total", "").toLowerCase();
            filteredNutrients.add(filteredNutrient);
        }
        return filteredNutrients;
    }
}