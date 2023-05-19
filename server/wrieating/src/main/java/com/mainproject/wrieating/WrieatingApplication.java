package com.mainproject.wrieating;

import com.mainproject.wrieating.dbsource.fooddb.CsvReader;
import com.mainproject.wrieating.dbsource.fooddb.DataWriter;
import com.mainproject.wrieating.dbsource.fooddb.entity.FoodData;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@SpringBootApplication
public class WrieatingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WrieatingApplication.class, args);

		String filePath1 = "/home/ec2-user/action/server/wrieating/src/main/resources/totalfooddb.csv";

		try {
			List<FoodData> dataList = CsvReader.readCsvFile(filePath1);
			DataWriter.saveDataToDatabase(dataList);
		} catch (IOException e) {
			System.err.println("Error reading CSV file: " + e.getMessage());
		} catch (SQLException e) {
			System.err.println("Error saving data to database: " + e.getMessage());
		}

		String filePath2 = "/home/ec2-user/action/server/wrieating/src/main/resources/totalrecipedb.csv";
	}
}
