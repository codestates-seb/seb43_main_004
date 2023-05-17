package com.mainproject.wrieating.meal.service;

import com.mainproject.wrieating.meal.entity.Meal;
import com.mainproject.wrieating.meal.repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;

    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public Meal updateMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public void deleteMeal(Long mealId) {
        Optional<Meal> meal = mealRepository.findById(mealId);
        if (meal.isPresent()) {
            mealRepository.deleteById(mealId);
        }
    }

    public Meal findMeal(long mealId) {
        return mealRepository.findById(mealId)
                .orElseThrow(() -> new RuntimeException("No data"));
    }
}