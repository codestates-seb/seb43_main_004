package com.mainproject.wrieating.dataArchive.service;

import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.dataArchive.dto.RecipeDataResponseDto;
import com.mainproject.wrieating.dataArchive.mapper.RecipeArchiveMapper;
import com.mainproject.wrieating.dataArchive.repository.RecipeArchiveRepository;
import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RecipeArchiveService {
    private final RecipeArchiveMapper mapper;
    private final RecipeArchiveRepository repository;

    public RecipeDataResponseDto findRecipe(long recipeId) {
        return mapper.recipeToRecipeResponseDto(findVerifiedRecipeData(recipeId));
    }

    public Page<RecipeData> findAllRecipe(int page, int size, String filter) {
        if (filter != null) {
            Pageable pageable = PageRequest.of(page, size);
            return repository.findRecipeByFilter("%" + filter + "%", pageable);
        } else {
            return repository.findAll(PageRequest.of(page, size));
        }
    }

    public Page<RecipeData> searchRecipe(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page,size);
        return repository.findRecipeByKeyword("%" + search + "%", pageable);
    }

    private RecipeData findVerifiedRecipeData(long recipeId) {
        return repository.findById(recipeId)
                .orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.RECIPE_NOT_FOUND)
                );
    }
}
