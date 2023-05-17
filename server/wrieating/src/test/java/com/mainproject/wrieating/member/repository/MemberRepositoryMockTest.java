package com.mainproject.wrieating.member.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.mock;

@SpringBootTest
public class MemberRepositoryMockTest {
    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("MemberRepository Not NUll 테스트")
    @Test
    public void MemberRespositoryNotNullTest(){
        MemberRepository memberRepository = mock(MemberRepository.class);
    }
}
