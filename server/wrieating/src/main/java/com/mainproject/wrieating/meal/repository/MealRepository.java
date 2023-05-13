package com.mainproject.wrieating.meal.repository;

import com.mainproject.wrieating.meal.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {

}