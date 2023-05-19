package com.mainproject.wrieating.dbsource.fooddb;

import com.mainproject.wrieating.dbsource.fooddb.entity.FoodData;

import java.util.List;
import java.io.IOException;
import java.sql.SQLException;

// 로컬 테스트용
public class execute {
    public static void main(String[] args) {
        String filePath = "C:\\Users\\keddy\\Desktop\\Personal Project\\wrieating-main-project\\server\\wrieating\\src\\main\\java\\com\\mainproject\\wrieating\\dbsource\\totalfooddb.csv";

        try {
            List<FoodData> dataList = CsvReader.readCsvFile(filePath);
            DataWriter.saveDataToDatabase(dataList);
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Error saving data to database: " + e.getMessage());
        }
    }
}
