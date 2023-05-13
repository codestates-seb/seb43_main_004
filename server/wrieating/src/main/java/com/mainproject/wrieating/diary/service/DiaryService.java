package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    public Diary createDiary(Diary diary) {
        return diaryRepository.save(diary);
    }

    public Diary findDiary(long diaryId) {
        return diaryRepository.findById(diaryId).orElseThrow(() -> new RuntimeException("No data"));
    }

    public Page<Diary> findAllDiaries(int page, int size) {
        return diaryRepository.findAll(PageRequest.of(
                page, size, Sort.by("userDate").descending()));
    }

    public Diary updateDiary(long diaryId, Diary diary) {
        Diary findDiary = findDiary(diaryId);
        Optional.ofNullable(diary.getMemo())
                .ifPresent(findDiary::setMemo);

        return diaryRepository.save(findDiary);
    }

    public void deleteDiary(long diaryId) {
        diaryRepository.deleteById(diaryId);
    }
}
