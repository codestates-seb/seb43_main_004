package com.mainproject.wrieating.dataArchive.dbsource.recipedb;

import com.mainproject.wrieating.dataArchive.dbsource.DatabaseConnection;
import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class RecipeDataWriter {
    public static void saveDataToDatabase(List<RecipeData> dataList) throws IOException, SQLException {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String query = "INSERT INTO recipe_data (rcp_name, rcp_way, rcp_pat, kcal, carbohydrate, protein, fat, salt, img, ingredients, manual01, manual_img01, manual02, manual_img02, manual03, manual_img03, manual04, manual_img04, manual05, manual_img05, manual06, manual_img06, rcp_na_tip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            for (RecipeData data : dataList) {
                PreparedStatement pstmt = conn.prepareStatement(query);
                pstmt.setString(1, data.getRcpName());
                pstmt.setString(2, data.getRcpWay());
                pstmt.setString(3, data.getRcpPat());
                pstmt.setInt(4, data.getKcal());
                pstmt.setInt(5, data.getCarbohydrate());
                pstmt.setInt(6, data.getProtein());
                pstmt.setInt(7, data.getFat());
                pstmt.setInt(8, data.getSalt());
                pstmt.setString(9, data.getImg());
                pstmt.setString(10, data.getIngredients());
                pstmt.setString(11, data.getManual01());
                pstmt.setString(12, data.getManualImg01());
                pstmt.setString(13, data.getManual02());
                pstmt.setString(14, data.getManualImg02());
                pstmt.setString(15, data.getManual03());
                pstmt.setString(16, data.getManualImg03());
                pstmt.setString(17, data.getManual04());
                pstmt.setString(18, data.getManualImg04());
                pstmt.setString(19, data.getManual05());
                pstmt.setString(20, data.getManualImg05());
                pstmt.setString(21, data.getManual06());
                pstmt.setString(22, data.getManualImg06());
                pstmt.setString(23, data.getRcpNaTip());

                pstmt.executeUpdate();
                pstmt.close();
            }
        }
    }
}

