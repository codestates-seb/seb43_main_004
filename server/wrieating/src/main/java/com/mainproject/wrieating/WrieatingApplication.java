package com.mainproject.wrieating;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.FoodCsvReader;
import com.mainproject.wrieating.dataArchive.dbsource.fooddb.FoodDataWriter;
import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.RecipeCsvReader;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.RecipeDataWriter;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@SpringBootApplication
public class WrieatingApplication extends SpringBootServletInitializer {
	// 환경 변수 주입 확인
//	@Value("${profile}")
//	private String env1;
//	@Value("${AWS_RDS_URL}")
//	private String env2;
//	@Value("${AWS_RDS_PASSWORD}")
//	private String env3;
//	@Value("${JWT_SECRET_KEY}")
//	private String env4;
//	@Value("${email}")
//	private String env5;
//	@Value("${password}")

//	private String env6;
public static void main(String[] args) {

	SpringApplication.run(WrieatingApplication.class, args);

	// 음식 아카이브 데이터 삽입
//	String filePath1 = "/home/ec2-user/action/server/wrieating/src/main/resources/totalfooddb.csv";
//	try {
//		List<FoodData> dataList1 = FoodCsvReader.readCsvFile(filePath1);
//		FoodDataWriter.saveDataToDatabase(dataList1);
//	} catch (IOException e) {
//		System.err.println("Error reading CSV file: " + e.getMessage());
//	} catch (SQLException e) {
//		System.err.println("Error saving data to database: " + e.getMessage());
//	}
//		 완료 - 주석 처리함

//		 레시피 아카이브 데이터 삽입
//	String filePath2 = "/home/ec2-user/action/server/wrieating/src/main/resources/recipe_data_source.csv";
//	try {
//		List<RecipeData> dataList2 = RecipeCsvReader.readCsvFile(filePath2);
//		RecipeDataWriter.saveDataToDatabase(dataList2);
//	} catch (IOException e) {
//		System.err.println("Error reading CSV file: " + e.getMessage());
//	} catch (SQLException e) {
//		System.err.println("Error saving data to database: " + e.getMessage());
//	}
	// 완료 - 주석 처리함
}

//	@PostConstruct
//	public void printEnvVariables() {
//		System.out.println(env1);
//		System.out.println(env2);
//		System.out.println(env3);
//		System.out.println(env4);
//		System.out.println(env5);
//		System.out.println(env6);
//	}
}
