package com.mainproject.wrieating.dataArchive.controller;

import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import com.mainproject.wrieating.dataArchive.dto.RecipeDataResponseDto;
import com.mainproject.wrieating.dataArchive.mapper.RecipeArchiveMapper;
import com.mainproject.wrieating.dataArchive.service.RecipeArchiveService;
import com.mainproject.wrieating.dto.MultiResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/recipes")
@AllArgsConstructor
@Validated
@Slf4j
public class RecipeArchiveController {
    private final RecipeArchiveService service;
    private final RecipeArchiveMapper mapper;


    @GetMapping("/{recipe-id}")
    public ResponseEntity getRecipe(@Positive @PathVariable("recipe-id") long recipeId) {
        RecipeDataResponseDto responseDto = service.findRecipe(recipeId);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getRecipes(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @Nullable @RequestParam String filter){
        Page<RecipeData> recipeDataPage = service.findAllRecipe(page - 1, size, filter);
        List<RecipeData> recipeDataList = recipeDataPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.recipesToRecipesResponseDto(recipeDataList), recipeDataPage),
                HttpStatus.OK
        );
    }

    @GetMapping("/search")
    public ResponseEntity searchRecipe(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size,
                                       @RequestParam String search) {
        Page<RecipeData> recipeDataPage = service.searchRecipe(page - 1, size, search);
        List<RecipeData> recipeDataList = recipeDataPage.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.recipesToRecipesResponseDto(recipeDataList), recipeDataPage),
                HttpStatus.OK
        );
    }
}
