package com.mainproject.wrieating.meal.controller;

import com.mainproject.wrieating.WrieatingApplication;
import com.mainproject.wrieating.meal.dto.MealPatchDto;
import com.mainproject.wrieating.meal.dto.MealPostDto;
import com.mainproject.wrieating.meal.dto.MealResponseDto;
import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.service.MealService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = WrieatingApplication.class)
public class MealControllerTest {

    @Autowired
    private MealController mealController;

    @Mock
    private MealService mealService;

    @Test
    public void postMealTest() {
        // given
        MealPostDto mealPostDto = new MealPostDto();
        mealPostDto.setDiaryId(1L);
        mealPostDto.setMealType("BREAKFAST");
        mealPostDto.setCarbohydrate(10);
        mealPostDto.setProtein(20);
        mealPostDto.setFat(30);
        mealPostDto.setKcal(400);
        mealPostDto.setSugar(5);
        mealPostDto.setSalt(2);

        Mockito.when(mealService.createMeal(Mockito.any(Meal.class))).thenReturn(new Meal());

        // when
        ResponseEntity<MealResponseDto> responseEntity = mealController.postMeal(mealPostDto);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().getMealType()).isEqualTo("BREAKFAST");
        assertThat(responseEntity.getBody().getCarbohydrate()).isEqualTo(10);
        assertThat(responseEntity.getBody().getProtein()).isEqualTo(20);
        assertThat(responseEntity.getBody().getFat()).isEqualTo(30);
        assertThat(responseEntity.getBody().getKcal()).isEqualTo(400);
        assertThat(responseEntity.getBody().getSugar()).isEqualTo(5);
        assertThat(responseEntity.getBody().getSalt()).isEqualTo(2);
    }

    @Test
    public void updateMealTest() {
        // given
        long mealId = 1L;
        MealPatchDto mealPatchDto = new MealPatchDto();
        mealPatchDto.setMealType("LUNCH");
        mealPatchDto.setCarbohydrate(20);
        mealPatchDto.setProtein(30);
        mealPatchDto.setFat(40);
        mealPatchDto.setKcal(500);
        mealPatchDto.setSugar(6);
        mealPatchDto.setSalt(3);

        Mockito.when(mealService.updateMeal(Mockito.any(Meal.class))).thenReturn(new Meal());

        // when
        ResponseEntity<MealResponseDto> responseEntity = mealController.updateMeal(mealId, mealPatchDto);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseEntity.getBody().getMealType()).isEqualTo("LUNCH");
        assertThat(responseEntity.getBody().getCarbohydrate()).isEqualTo(20);
        assertThat(responseEntity.getBody().getProtein()).isEqualTo(30);
        assertThat(responseEntity.getBody().getFat()).isEqualTo(40);
        assertThat(responseEntity.getBody().getKcal()).isEqualTo(500);
        assertThat(responseEntity.getBody().getSugar()).isEqualTo(6);
        assertThat(responseEntity.getBody().getSalt()).isEqualTo(3);
    }

    @Test
    public void deleteMealTest() {
        // given
        long mealId = 1L;


        Mockito.doAnswer(invocation -> {

            return null;
        }).when(mealService.deleteMeal(Mockito.anyLong()));

        // when
        ResponseEntity<Void> responseEntity = mealController.deleteMeal(mealId);

        // then
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

}