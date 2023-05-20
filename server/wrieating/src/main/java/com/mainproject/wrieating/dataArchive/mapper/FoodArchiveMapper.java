package com.mainproject.wrieating.dataArchive.mapper;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.dto.FoodDataResponseDto;
import com.mainproject.wrieating.dataArchive.dto.FoodsResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FoodArchiveMapper {
    FoodDataResponseDto foodToFoodResponseDto(FoodData foodData);

    List<FoodsResponseDto> foodsToFoodsResponseDto(List<FoodData> foodData);
}
