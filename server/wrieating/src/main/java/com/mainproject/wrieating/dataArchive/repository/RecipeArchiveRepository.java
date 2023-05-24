package com.mainproject.wrieating.dataArchive.repository;

import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeArchiveRepository extends JpaRepository<RecipeData, Long> {
    @Query("SELECT r FROM RecipeData r WHERE r.rcpWay LIKE '%' || :filter || '%'")
    Page<RecipeData> findRecipeByFilter(@Param("filter") String filter,  Pageable pageable);

    @Query("SELECT r FROM RecipeData r WHERE r.rcpName LIKE '%' || :keyword || '%'")
    Page<RecipeData> findRecipeByKeyword(@Param("keyword") String keyword,  Pageable pageable);

//    @Query(value = "SELECT rd.* FROM RECIPE_DATA rd WHERE <custom_query> ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom_query") String customQuery);


//    @Query(value = "SELECT rd.* FROM RECIPE_DATA rd WHERE rd.recipe_id AND rd.img AND rd.rcp_name = :custom_query ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom_query") String customQuery);


//    @Query(value = "SELECT recipe_id, img, rcp_name FROM RECIPE_DATA rd WHERE :custom_query ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom_query") String customQuery);


//    @Query(value = "SELECT rd.recipeId, rd.img, rd.rcpName FROM RecipeData rd WHERE :customquery ORDER BY RAND() LIMIT 3")
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("customquery") String customQuery);


//    @Query(value = ":custom_query", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom_query") String customQuery);


//    @Query(value = "SELECT * FROM RECIPE_DATA rd WHERE = :customQuery ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("customQuery") String customQuery);       //- 여기까지 같이하다 끔



    @Query(value = "#{#custom}", nativeQuery = true)
    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom") String custom);

//    @Query(value = "SELECT rd.recipe_id, rd.img, rd.rcp_name FROM RECIPE_DATA rd WHERE rd.kcal >= :kcal AND rd.fat >= :fat AND rd.salt >= :salt AND rd.carbohydrate >= :carbohydrate AND rd.protein >= :protein ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("kcal") int kcal, @Param("fat") int fat, @Param("salt") int salt, @Param("carbohydrate") int carbohydrate, @Param("protein") int protein);


















//    @Query(value = "SELECT * FROM RECIPE_DATA rd WHERE recipe_id AND img AND rcp_name = :custom_query ORDER BY RAND() LIMIT 3", nativeQuery = true)
//    List<RecipeData> findRandomRecipeDataWithCustomQuery(@Param("custom_query") String customQuery);

}

