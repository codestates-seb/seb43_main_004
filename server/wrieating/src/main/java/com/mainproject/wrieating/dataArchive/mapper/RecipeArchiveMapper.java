package com.mainproject.wrieating.dataArchive.mapper;

import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.dataArchive.dto.RecipeDataResponseDto;
import com.mainproject.wrieating.dataArchive.dto.RecipesResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RecipeArchiveMapper {
    RecipeDataResponseDto recipeToRecipeResponseDto(RecipeData recipeData);

    List<RecipesResponseDto> recipesToRecipesResponseDto(List<RecipeData> recipeData);
}
