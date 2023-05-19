package com.mainproject.wrieating.dbsource.fooddb;

import com.mainproject.wrieating.dbsource.DatabaseConnection;
import com.mainproject.wrieating.dbsource.fooddb.entity.FoodData;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class FoodDataWriter {
    public static void saveDataToDatabase(List<FoodData> dataList) throws IOException, SQLException {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String query =
                    "INSERT INTO food_data (food_name, food_rough_Type, food_detail_type, serving_size, kcal, carbohydrate, fat, protein,  total_sugar, natrium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            for (FoodData data : dataList) {
                PreparedStatement pstmt = conn.prepareStatement(query);
                pstmt.setString(1, data.getFoodName());
                pstmt.setString(2, data.getFoodRoughType());
                pstmt.setString(3, data.getFoodDetailType());
                pstmt.setString(4, data.getServingSize());
                pstmt.setInt(5, data.getKcal());
                pstmt.setInt(6, data.getCarbohydrate());
                pstmt.setInt(7, data.getFat());
                pstmt.setInt(8, data.getProtein());
                pstmt.setInt(9, data.getTotalSugar());
                pstmt.setInt(10, data.getNatrium());

                pstmt.executeUpdate();
                pstmt.close();
            }
        }
    }
}
