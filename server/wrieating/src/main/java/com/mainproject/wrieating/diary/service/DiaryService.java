package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
}
