package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.diary.dto.DiaryPatchDto;
import com.mainproject.wrieating.diary.dto.DiaryPostDto;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryMapper mapper;

    public void createDiary(DiaryPostDto diaryPostDto) {
        Diary diary = mapper.diaryPostDtoToDiary(diaryPostDto);

        existDiary(diary.getUserDate());

        diaryRepository.save(diary);
    }

    public Diary findDiary(long diaryId) {
        return findVerifiedDiary(diaryId);
    }

    public Page<Diary> findAllDiaries(int page, int size) {
        return diaryRepository.findAll(PageRequest.of(
                page, size, Sort.by("userDate").descending()));
    }

    public Diary updateDiary(long diaryId, DiaryPatchDto diaryPatchDto) {
        Diary findDiary = findVerifiedDiary(diaryId);
        Optional.ofNullable(diaryPatchDto.getMemo()) // patch mapper 삭제
                .ifPresent(findDiary::setMemo);

        return diaryRepository.save(findDiary);
    }

    public void deleteDiary(long diaryId) {
        findVerifiedDiary(diaryId);
        diaryRepository.deleteById(diaryId);
    }

    private Diary findVerifiedDiary(long diaryId) {
        return diaryRepository.findById(diaryId)
                        .orElseThrow(
                                () -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND)
                        );
    }

    private void existDiary(LocalDate userDate) {
        if (diaryRepository.findByUserDate(userDate) != null)
            throw new BusinessLogicException(ExceptionCode.DIARY_EXIST);
    }
}
