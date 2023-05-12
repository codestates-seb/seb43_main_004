package com.mainproject.wrieating.meal.service;

import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.repository.MealRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class MealServiceTest {

    @Mock
    private MealRepository mealRepository;

    @InjectMocks
    private MealService mealService;

    @Test
    @DisplayName("meal 등록 테스트")
    public void createMealTest() {
        Meal meal = new Meal();
        meal.setMealId(1L);
        meal.setMealType(Meal.MealType.BREAKFAST);
        meal.setCarbohydrate(30);
        meal.setProtein(10);
        meal.setFat(5);
        meal.setKcal(200);
        meal.setSugar(3);
        meal.setSalt(1);

        Mockito.when(mealRepository.save(meal)).thenReturn(meal);
        // when
        Meal saveMeal = mealService.createMeal(meal);

        // then
        assertNotNull(saveMeal);
        assertEquals(meal.getMealId(),(saveMeal.getMealId()));
        assertTrue(meal.getMealType().equals(saveMeal.getMealType()));
        assertEquals(meal.getCarbohydrate(), saveMeal.getCarbohydrate());
        assertEquals(meal.getProtein(), saveMeal.getProtein());
        assertEquals(meal.getFat(), saveMeal.getFat());
        assertEquals(meal.getKcal(), saveMeal.getKcal());
        assertEquals(meal.getSugar(), saveMeal.getSugar());
        assertEquals(meal.getSalt(), saveMeal.getSalt());
    }

    @Test
    @DisplayName("meal 수정 테스트")
    public void updateMealTest() {
        // given
        Meal meal = new Meal();
        meal.setMealId(1L);
        meal.setMealType(Meal.MealType.BREAKFAST);
        meal.setCarbohydrate(30);
        meal.setProtein(10);
        meal.setFat(5);
        meal.setKcal(200);
        meal.setSugar(3);
        meal.setSalt(1);

        Mockito.when(mealRepository.findById(1L)).thenReturn(Optional.of(meal));

        Meal updatedMeal = new Meal();
        updatedMeal.setMealId(1L);
        updatedMeal.setMealType(Meal.MealType.LUNCH);
        updatedMeal.setCarbohydrate(20);
        updatedMeal.setProtein(15);
        updatedMeal.setFat(10);
        updatedMeal.setKcal(250);
        updatedMeal.setSugar(4);
        updatedMeal.setSalt(2);

        Mockito.when(mealRepository.save(updatedMeal)).thenReturn(updatedMeal);

        // when
        Meal saveMeal = mealService.updateMeal(updatedMeal);

        // then
        assertNotNull(saveMeal);
        assertEquals(updatedMeal.getMealId(),(saveMeal.getMealId()));
        assertTrue(updatedMeal.getMealType().equals(saveMeal.getMealType()));
        assertEquals(updatedMeal.getCarbohydrate(), saveMeal.getCarbohydrate());
        assertEquals(updatedMeal.getProtein(), saveMeal.getProtein());
        assertEquals(updatedMeal.getFat(), saveMeal.getFat());
        assertEquals(updatedMeal.getKcal(), saveMeal.getKcal());
        assertEquals(updatedMeal.getSugar(), saveMeal.getSugar());
        assertEquals(updatedMeal.getSalt(), saveMeal.getSalt());

    }

    @Test
    @DisplayName("meal 등록 테스트")
    public void deleteMealTest() {

    }

}
