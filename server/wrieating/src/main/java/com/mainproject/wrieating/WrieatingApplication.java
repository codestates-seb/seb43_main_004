package com.mainproject.wrieating;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WrieatingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WrieatingApplication.class, args);

		// 음식 아카이브 데이터 삽입
//		String filePath1 = "/home/ec2-user/action/server/wrieating/src/main/resources/totalfooddb.csv";
//
//		try {
//			List<FoodData> dataList = CsvReader.readCsvFile(filePath1);
//			DataWriter.saveDataToDatabase(dataList);
//		} catch (IOException e) {
//			System.err.println("Error reading CSV file: " + e.getMessage());
//		} catch (SQLException e) {
//			System.err.println("Error saving data to database: " + e.getMessage());
//		}
		// 완료 - 주석 처리함

		// 레시피 아카이브 데이터 삽입
//		String filePath2 = "/home/ec2-user/action/server/wrieating/src/main/resources/recipe_data_source.csv";
//
//				try {
//			List<RecipeData> dataList = CsvReader.readCsvFile(filePath2);
//			DataWriter.saveDataToDatabase(dataList);
//		} catch (IOException e) {
//			System.err.println("Error reading CSV file: " + e.getMessage());
//		} catch (SQLException e) {
//			System.err.println("Error saving data to database: " + e.getMessage());
//		}
		// 완료 - 주석 처리함
	}
}
