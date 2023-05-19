package com.mainproject.wrieating;

import com.mainproject.wrieating.dbsource.fooddb.FoodCsvReader;
import com.mainproject.wrieating.dbsource.fooddb.FoodDataWriter;
import com.mainproject.wrieating.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dbsource.recipedb.RecipeCsvReader;
import com.mainproject.wrieating.dbsource.recipedb.RecipeDataWriter;
import com.mainproject.wrieating.dbsource.recipedb.entity.RecipeData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@SpringBootApplication
public class WrieatingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WrieatingApplication.class, args);

		// 음식 아카이브 데이터 삽입
		String filePath1 = "/home/ec2-user/action/server/wrieating/src/main/resources/totalfooddb.csv";
//		String filePath1 = "C:\\Users\\keddy\\Desktop\\Personal Project\\wrieating-main-project\\server\\wrieating\\src\\main\\resources\\totalfooddb.csv";

		try {
			List<FoodData> dataList = FoodCsvReader.readCsvFile(filePath1);
			FoodDataWriter.saveDataToDatabase(dataList);
		} catch (IOException e) {
			System.err.println("Error reading CSV file: " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Error saving data to database: " + e.getMessage());
		}
		// 완료 - 주석 처리함

		// 레시피 아카이브 데이터 삽입
		String filePath2 = "/home/ec2-user/action/server/wrieating/src/main/resources/recipe_data_source.csv";
//		String filePath2 = "C:\\Users\\keddy\\Desktop\\Personal Project\\wrieating-main-project\\server\\wrieating\\src\\main\\resources\\recipe_data_source.csv";

				try {
			List<RecipeData> dataList = RecipeCsvReader.readCsvFile(filePath2);
			RecipeDataWriter.saveDataToDatabase(dataList);
		} catch (IOException e) {
			System.err.println("Error reading CSV file: " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Error saving data to database: " + e.getMessage());
		}
		// 완료 - 주석 처리함
	}
}
