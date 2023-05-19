package com.mainproject.wrieating.dbsource.recipedb;

import com.mainproject.wrieating.dbsource.recipedb.entity.RecipeData;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class DataWriter {
    public static void saveDataToDatabase(List<RecipeData> dataList) throws IOException, SQLException {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String query = "INSERT INTO recipe_data (rcp_name, rcp_way, rcp_pat, weight, kcal, carbohydrate, protein, fat, natrium, tag, img, ingredients, manual01, manual_img01, manual02, manual_img02, manual03, manual_img03, manual04, manual_img04, manual05, manual_img05, manual06, manual_img06, rcp_na_tip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            for (RecipeData data : dataList) {
                PreparedStatement pstmt = conn.prepareStatement(query);
                pstmt.setString(1, data.getRcpName());
                pstmt.setString(2, data.getRcpWay());
                pstmt.setString(3, data.getRcpPat());
                pstmt.setString(4, data.getWeight());
                pstmt.setString(5, data.getKcal());
                pstmt.setString(6, data.getCarbohydrate());
                pstmt.setString(7, data.getProtein());
                pstmt.setString(8, data.getFat());
                pstmt.setString(9, data.getNatrium());
                pstmt.setString(10, data.getTag());
                pstmt.setString(11, data.getImg());
                pstmt.setString(12, data.getIngredients());
                pstmt.setString(13, data.getManual01());
                pstmt.setString(14, data.getManualImg01());
                pstmt.setString(15, data.getManual02());
                pstmt.setString(16, data.getManualImg02());
                pstmt.setString(17, data.getManual03());
                pstmt.setString(18, data.getManualImg03());
                pstmt.setString(19, data.getManual04());
                pstmt.setString(20, data.getManualImg04());
                pstmt.setString(21, data.getManual05());
                pstmt.setString(22, data.getManualImg05());
                pstmt.setString(23, data.getManual06());
                pstmt.setString(24, data.getManualImg06());
                pstmt.setString(25, data.getRcpNaTip());

                pstmt.executeUpdate();
                pstmt.close();
            }
        }
    }
}

