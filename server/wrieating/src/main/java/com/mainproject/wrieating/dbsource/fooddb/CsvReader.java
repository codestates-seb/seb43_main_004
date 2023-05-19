package com.mainproject.wrieating.dbsource.fooddb;

import com.mainproject.wrieating.dbsource.fooddb.entity.FoodData;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CsvReader {
    public static List<FoodData> readCsvFile(String filePath) throws IOException {
        FileReader reader = new FileReader(filePath);
        Iterable<CSVRecord> records = CSVFormat.RFC4180.withHeader(
                "NO","식품명","식품대분류","식품상세분류","1회제공량","에너지(㎉)","단백질(g)","지방(g)","탄수화물(g)","총당류(g)","나트륨(㎎)"
        ).parse(reader); // 컬럼
        List<FoodData> dataList = new ArrayList<>();

        for (CSVRecord record : records) {
            FoodData data = new FoodData();
            data.setNo(record.get("NO"));
            data.setFoodName(record.get("식품명"));
            data.setFoodRoughType(record.get("식품대분류"));
            data.setFoodDetailType(record.get("식품상세분류"));
            data.setServingSize(record.get("1회제공량"));
            data.setKcal(record.get("에너지(㎉)"));
            data.setProtein(record.get("단백질(g)"));
            data.setFat(record.get("지방(g)"));
            data.setCarbohydrate(record.get("탄수화물(g)"));
            data.setTotalSugar(record.get("총당류(g)"));
            data.setNatrium(record.get("나트륨(㎎)"));
            dataList.add(data);
        }

        reader.close();
        return dataList;
    }
}
