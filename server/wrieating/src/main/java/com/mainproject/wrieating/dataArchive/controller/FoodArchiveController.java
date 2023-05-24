package com.mainproject.wrieating.dataArchive.controller;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.dto.FoodDataResponseDto;
import com.mainproject.wrieating.dataArchive.mapper.FoodArchiveMapper;
import com.mainproject.wrieating.dataArchive.service.FoodArchiveService;
import com.mainproject.wrieating.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/nutrient")
@Validated
@Slf4j
@AllArgsConstructor
public class FoodArchiveController {
    private final FoodArchiveService service;
    private final FoodArchiveMapper mapper;

    @GetMapping("/{food-id}")
    public ResponseEntity getFoodData(@Positive @PathVariable("food-id") Long foodId) {

        FoodDataResponseDto responseDto = service.findFood(foodId);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllFoodData(@Positive @RequestParam int page,
                                         @Positive @RequestParam int size) {
        Page<FoodData> foodDataPage = service.findAllFood(page-1,size);
        List<FoodData> foodDataList = foodDataPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.foodsToFoodsResponseDto(foodDataList), foodDataPage),
                HttpStatus.OK
        );
    }

    @GetMapping("/search")
    public ResponseEntity getSearchFood(@Positive @RequestParam int page,
                                        @Positive @RequestParam int size,
                                        @RequestParam String search) {
        Page<FoodData> foodDataPage = service.searchFood(page-1, size, search);
        List<FoodData> foodDataList = foodDataPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.foodsToFoodsResponseDto(foodDataList), foodDataPage),
                HttpStatus.OK
        );
    }
}
