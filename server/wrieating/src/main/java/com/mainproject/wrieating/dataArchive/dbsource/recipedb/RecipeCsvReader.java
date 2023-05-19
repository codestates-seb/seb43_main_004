package com.mainproject.wrieating.dataArchive.dbsource.recipedb;

import com.mainproject.wrieating.dataArchive.dbsource.recipedb.entity.RecipeData;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RecipeCsvReader {
    public static List<RecipeData> readCsvFile(String filePath) throws IOException {
        FileReader reader = new FileReader(filePath);
        Iterable<CSVRecord> records = CSVFormat.RFC4180.withHeader(
                "rcp_name", "rcp_way", "rcp_pat", "weight", "kcal", "carbohydrate", "protein",
                "fat", "natrium", "tag", "img", "ingredients", "MANUAL01", "MANUAL_IMG01",
                "MANUAL02", "MANUAL_IMG02", "MANUAL03", "MANUAL_IMG03", "MANUAL04", "MANUAL_IMG04",
                "MANUAL05", "MANUAL_IMG05", "MANUAL06", "MANUAL_IMG06", "RCP_NA_TIP"
        ).parse(reader); // 컬럼
        List<RecipeData> dataList = new ArrayList<>();

        boolean isFirstRow = true; // 첫 번째 행인지 여부를 나타내는 변수

        for (CSVRecord record : records) {
            if (isFirstRow) {
                isFirstRow = false;
                continue;
            }
            if (isDataMissing(record)) {
                continue;
            }
            RecipeData data = new RecipeData();
            data.setRcpName(record.get("rcp_name"));
            data.setRcpWay(record.get("rcp_way"));
            data.setRcpPat(record.get("rcp_pat"));
            data.setNatrium((int) Double.parseDouble(record.get("weight")));
            data.setKcal((int) Double.parseDouble(record.get("kcal")));
            data.setCarbohydrate((int) Double.parseDouble(record.get("carbohydrate")));
            data.setProtein((int) Double.parseDouble(record.get("protein")));
            data.setFat((int) Double.parseDouble(record.get("fat")));
            data.setNatrium((int) Double.parseDouble(record.get("natrium")));
            data.setTag(record.get("tag"));
            data.setImg(record.get("img"));
            data.setIngredients(record.get("ingredients"));
            data.setManual01(record.get("MANUAL01"));
            data.setManualImg01(record.get("MANUAL_IMG01"));
            data.setManual02(record.get("MANUAL02"));
            data.setManualImg02(record.get("MANUAL_IMG02"));
            data.setManual03(record.get("MANUAL03"));
            data.setManualImg03(record.get("MANUAL_IMG03"));
            data.setManual04(record.get("MANUAL04"));
            data.setManualImg04(record.get("MANUAL_IMG04"));
            data.setManual05(record.get("MANUAL05"));
            data.setManualImg05(record.get("MANUAL_IMG05"));
            data.setManual06(record.get("MANUAL06"));
            data.setManualImg06(record.get("MANUAL_IMG06"));
            data.setRcpNaTip(record.get("RCP_NA_TIP"));
            dataList.add(data);
        }

        reader.close();
        return dataList;
    }

    private static boolean isDataMissing(CSVRecord record) {
        String weightStr = record.get("weight");
        String kcalStr = record.get("kcal");
        String carStr = record.get("carbohydrate");
        String proStr = record.get("protein");
        String fatStr = record.get("fat");
        String natriumStr = record.get("natrium");

        return kcalStr.isEmpty() || weightStr.isEmpty() || fatStr.isEmpty()
                || carStr.isEmpty() || proStr.isEmpty() || natriumStr.isEmpty();
    }
}
