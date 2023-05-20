package com.mainproject.wrieating.dataArchive.service;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.dto.FoodDataResponseDto;
import com.mainproject.wrieating.dataArchive.mapper.FoodArchiveMapper;
import com.mainproject.wrieating.dataArchive.repository.FoodArchiveRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FoodArchiveService {
    private final FoodArchiveMapper mapper;
    private final FoodArchiveRepository repository;

    public FoodDataResponseDto findFood(long foodId) {
        return mapper.foodToFoodResponseDto(findVerifiedFoodData(foodId));
    }

    public Page<FoodData> findAllFood(int page, int size) {
        return repository.findAll(PageRequest.of(page,size));
    }



    public Page<FoodData> searchFood(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findFoodDataByKeyword(search, pageable);
    }

    private FoodData findVerifiedFoodData(long foodId) {
        return repository.findById(foodId)
                .orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.FOOD_NOT_FOUND)
                );
    }
}
