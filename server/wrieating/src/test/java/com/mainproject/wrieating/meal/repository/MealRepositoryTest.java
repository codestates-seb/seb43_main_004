package com.mainproject.wrieating.meal.repository;

import com.mainproject.wrieating.meal.entity.Meal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class MealRepositoryTest {
    @Autowired
    private MealRepository mealRepository;

    @Test
    @DisplayName("Meal Repository 정상 작동 테스트")
    public void DiaryRepositoryIsNotNull() {
        assertThat(mealRepository).isNotNull();
    }

    @Test
    @DisplayName("Meal Repository meal 등록 테스트")
    public void saveMealTest() {
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

        // when
        Meal saveMeal = mealRepository.save(meal);

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
    @DisplayName("Meal Repository 삭제 테스트")
    public void MealDeleteTest() {

        Meal meal = new Meal();
        meal.setMealId(1L);
        meal.setMealType(Meal.MealType.BREAKFAST);
        meal.setCarbohydrate(30);
        meal.setProtein(10);
        meal.setFat(5);
        meal.setKcal(200);
        meal.setSugar(3);
        meal.setSalt(1);

        mealRepository.save(meal);

        mealRepository.deleteById(1L);

        assertThat(mealRepository.findById(1L).isEmpty());
    }

}