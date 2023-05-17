// package com.mainproject.wrieating.meal.service;

// import com.mainproject.wrieating.meal.entity.Meal;
// import com.mainproject.wrieating.meal.repository.MealRepository;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.test.annotation.DirtiesContext;

// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.times;

// @ExtendWith(MockitoExtension.class)
// @DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
// public class MealServiceTest {

//     @Mock
//     private MealRepository mealRepository;

//     @InjectMocks
//     private MealService mealService;

//     @Test
//     @DisplayName("meal 등록 테스트")
//     public void createMealTest() {
//         Meal meal = new Meal();
//         meal.setMealId(1L);
//         meal.setMealType(Meal.MealType.BREAKFAST);
//         meal.setCarbohydrate(30);
//         meal.setProtein(10);
//         meal.setFat(5);
//         meal.setKcal(200);
//         meal.setSugar(3);
//         meal.setSalt(1);

//         Mockito.when(mealRepository.save(meal)).thenReturn(meal);
//         // when
//         Meal saveMeal = mealService.createMeal(meal);

//         // then
//         assertNotNull(saveMeal);
//         assertEquals(meal.getMealId(),(saveMeal.getMealId()));
//         assertTrue(meal.getMealType().equals(saveMeal.getMealType()));
//         assertEquals(meal.getCarbohydrate(), saveMeal.getCarbohydrate());
//         assertEquals(meal.getProtein(), saveMeal.getProtein());
//         assertEquals(meal.getFat(), saveMeal.getFat());
//         assertEquals(meal.getKcal(), saveMeal.getKcal());
//         assertEquals(meal.getSugar(), saveMeal.getSugar());
//         assertEquals(meal.getSalt(), saveMeal.getSalt());
//     }

//     @Test
//     @DisplayName("meal 수정 테스트")
//     public void updateMealTest() {
//         // given
//         Meal meal = new Meal();
//         meal.setMealId(1L);
//         meal.setMealType(Meal.MealType.BREAKFAST);
//         meal.setCarbohydrate(30);
//         meal.setProtein(10);
//         meal.setFat(5);
//         meal.setKcal(200);
//         meal.setSugar(3);
//         meal.setSalt(1);

//         Mockito.lenient().when(mealRepository.findById(1L)).thenReturn(Optional.of(meal));

//         Meal patchMeal = new Meal();
//         patchMeal.setMealId(1L);
//         patchMeal.setMealType(Meal.MealType.LUNCH);
//         patchMeal.setCarbohydrate(20);
//         patchMeal.setProtein(15);
//         patchMeal.setFat(10);
//         patchMeal.setKcal(250);
//         patchMeal.setSugar(4);
//         patchMeal.setSalt(2);

//         Mockito.when(mealRepository.save(patchMeal)).thenReturn(patchMeal);

//         // when
//         Meal saveMeal = mealService.updateMeal(patchMeal);

//         // then
//         assertNotNull(saveMeal);
//         assertEquals(patchMeal.getMealId(),(saveMeal.getMealId()));
//         assertTrue(patchMeal.getMealType().equals(saveMeal.getMealType()));
//         assertEquals(patchMeal.getCarbohydrate(), saveMeal.getCarbohydrate());
//         assertEquals(patchMeal.getProtein(), saveMeal.getProtein());
//         assertEquals(patchMeal.getFat(), saveMeal.getFat());
//         assertEquals(patchMeal.getKcal(), saveMeal.getKcal());
//         assertEquals(patchMeal.getSugar(), saveMeal.getSugar());
//         assertEquals(patchMeal.getSalt(), saveMeal.getSalt());

//     }

//     @Test
//     @DisplayName("meal 삭제 테스트")
//     public void deleteMealTest() {
//         // given
//         long mealId = 1L;

//         Mockito.when(mealRepository.findById(mealId)).thenReturn(Optional.of(new Meal(Meal.MealType.BREAKFAST, 10, 20, 30, 500, 5, 2)));

//         // when
//         mealService.deleteMeal(mealId);

//         // then
//         Mockito.verify(mealRepository, times(1)).deleteById(mealId);
//     }
// }
