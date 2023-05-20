package com.mainproject.wrieating.dataArchive.repository;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodArchiveRepository extends JpaRepository<FoodData,Long> {
    @Query("SELECT f FROM FoodData f WHERE f.foodName LIKE '%' || :keyword || '%'")
    Page<FoodData> findFoodDataByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
