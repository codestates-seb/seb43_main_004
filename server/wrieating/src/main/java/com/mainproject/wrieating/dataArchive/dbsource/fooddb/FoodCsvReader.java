package com.mainproject.wrieating.dataArchive.dbsource.fooddb;

import com.mainproject.wrieating.dataArchive.dbsource.fooddb.entity.FoodData;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FoodCsvReader {
    public static List<FoodData> readCsvFile(String filePath) throws IOException {
        FileReader reader = new FileReader(filePath);
        Iterable<CSVRecord> records = CSVFormat.RFC4180.withHeader(
                "식품명","식품대분류","식품상세분류","1회제공량","에너지(㎉)","단백질(g)","지방(g)","탄수화물(g)","총당류(g)","나트륨(㎎)"
        ).parse(reader); // 컬럼
        List<FoodData> dataList = new ArrayList<>();

        boolean isFirstRow = true; // 첫 번째 행인지 여부를 나타내는 변수

        for (CSVRecord record : records) {
            if (isFirstRow) {
                isFirstRow = false;
                continue;
            }
            FoodData data = new FoodData();
            data.setFoodName(record.get("식품명"));
            data.setFoodRoughType(record.get("식품대분류"));
            data.setFoodDetailType(record.get("식품상세분류"));
            data.setServingSize(Integer.parseInt(record.get("1회제공량")));

            data.setKcal((int) Double.parseDouble(record.get("에너지(㎉)")));
            data.setProtein((int) Double.parseDouble(record.get("단백질(g)")));
            data.setFat((int) Double.parseDouble(record.get("지방(g)")));
            data.setCarbohydrate((int) Double.parseDouble(record.get("탄수화물(g)")));
            data.setSugar((int) Double.parseDouble(record.get("총당류(g)")));
            data.setSalt((int) Double.parseDouble(record.get("나트륨(㎎)")));

            dataList.add(data);
        }

        reader.close();
        return dataList;
    }
}
