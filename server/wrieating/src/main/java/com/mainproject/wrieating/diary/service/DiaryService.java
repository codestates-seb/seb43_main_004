package com.mainproject.wrieating.diary.service;

import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.diary.dto.DiaryPatchDto;
import com.mainproject.wrieating.diary.dto.DiaryPostDto;
import com.mainproject.wrieating.diary.entity.Diary;
import com.mainproject.wrieating.diary.mapper.DiaryMapper;
import com.mainproject.wrieating.diary.repository.DiaryRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import com.mainproject.wrieating.member.entity.Member;
import com.mainproject.wrieating.member.service.MemberService;
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
    private final JwtTokenizer tokenizer;
    private final MemberService memberService;

    public void createDiary(String token, DiaryPostDto diaryPostDto) {
        Diary diary = mapper.diaryPostDtoToDiary(diaryPostDto);

        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token));

        existDiary(diary.getUserDate());

        diary.setMember(member);

        diaryRepository.save(diary);
    }

    public Diary findDiary(String token,long diaryId) {
        Diary diary = findVerifiedDiary(diaryId);
        Member member = memberService.findVerifiedMember(tokenizer.getMemberId(token));
        verifiedRequest(diary.getMember().getMemberId(), member.getMemberId());

        return diary;
    }

    public Page<Diary> findAllDiaries(String token,int page, int size) {
        return diaryRepository.findAllByMemberMemberId(tokenizer.getMemberId(token),
                PageRequest.of(page, size, Sort.by("userDate").descending()));

    }

    public void updateDiary(long diaryId, DiaryPatchDto diaryPatchDto) {
        Diary findDiary = findVerifiedDiary(diaryId);

        Optional.ofNullable(diaryPatchDto.getMemo()) // patch mapper 삭제
                .ifPresent(findDiary::setMemo);

        diaryRepository.save(findDiary);
    }

    public void deleteDiary(long diaryId) {
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

    private void verifiedRequest(long diaryMemberId, long compareId) {
        if (diaryMemberId != compareId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED);
        }
    }
}
