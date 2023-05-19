package com.mainproject.wrieating.dataArchive.dbsource.recipedb.convertor;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.*;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ApiToCsvConverter {
    public static void main(String[] args) {
        String apiUrl1 = "http://openapi.foodsafetykorea.go.kr/api/292697fbaf0c44548af7/COOKRCP01/json/1/1000";
        String apiUrl2 = "http://openapi.foodsafetykorea.go.kr/api/292697fbaf0c44548af7/COOKRCP01/json/1001/1114";
        String csvFilePath = "recipedb.csv";

        try {
            List<JsonObject> jsonData = new ArrayList<>();

            // 첫 번째 API 데이터 받아오기
            JsonObject json1 = getJsonFromApi(apiUrl1);
            if (json1 != null) {
                JsonArray rowArray1 = json1.getAsJsonObject("COOKRCP01").getAsJsonArray("row");
                jsonData.addAll(parseJsonArray(rowArray1));
            }

            // 두 번째 API 데이터 받아오기
            JsonObject json2 = getJsonFromApi(apiUrl2);
            if (json2 != null) {
                JsonArray rowArray2 = json2.getAsJsonObject("COOKRCP01").getAsJsonArray("row");
                jsonData.addAll(parseJsonArray(rowArray2));
            }

            // CSV 파일 생성 및 데이터 작성
            writeDataToCsv(jsonData, csvFilePath);
            System.out.println("API data successfully converted to CSV.");
        } catch (IOException e) {
            System.err.println("Error converting API to CSV: " + e.getMessage());
        }
    }

    private static JsonObject getJsonFromApi(String apiUrl) throws IOException {
        // API 호출 및 JSON 데이터 받아오기
        String jsonResponse = getJsonResponseFromApi(apiUrl);

        // JSON 파싱
        Gson gson = new Gson();
        JsonObject json = gson.fromJson(jsonResponse, JsonObject.class);

        return json;
    }

    private static List<JsonObject> parseJsonArray(JsonArray jsonArray) {
        List<JsonObject> jsonData = new ArrayList<>();
        for (JsonElement element : jsonArray) {
            if (element instanceof JsonObject) {
                jsonData.add((JsonObject) element);
            }
        }
        return jsonData;
    }

    private static void writeDataToCsv(List<JsonObject> jsonData, String csvFilePath) throws IOException {
        // CSV 파일 생성
        BufferedWriter writer = new BufferedWriter(new FileWriter(csvFilePath));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.EXCEL);;

        // 헤더 작성
        csvPrinter.printRecord(
                "RCP_SEQ", "RCP_NM", "RCP_WAY2", "RCP_PAT2", "INFO_WGT", "INFO_ENG", "INFO_CAR",
                "INFO_PRO", "INFO_FAT", "INFO_NA", "HASH_TAG", "ATT_FILE_NO_MAIN", "ATT_FILE_NO_MK",
                "RCP_PARTS_DTLS", "MANUAL01", "MANUAL_IMG01", "MANUAL02", "MANUAL_IMG02", "MANUAL03",
                "MANUAL_IMG03", "MANUAL04", "MANUAL_IMG04", "MANUAL05", "MANUAL_IMG05", "MANUAL06",
                "MANUAL_IMG06", "MANUAL07", "MANUAL_IMG07", "MANUAL08", "MANUAL_IMG08", "MANUAL09",
                "MANUAL_IMG09", "MANUAL10", "MANUAL_IMG10", "MANUAL11", "MANUAL_IMG11", "MANUAL12",
                "MANUAL_IMG12", "MANUAL13", "MANUAL_IMG13", "MANUAL14", "MANUAL_IMG14", "MANUAL15",
                "MANUAL_IMG15", "MANUAL16", "MANUAL_IMG16", "MANUAL17", "MANUAL_IMG17", "MANUAL18",
                "MANUAL_IMG18", "MANUAL19", "MANUAL_IMG19", "MANUAL20", "MANUAL_IMG20", "RCP_NA_TIP"
        );

        // 데이터 작성
        for (JsonObject data : jsonData) {
            csvPrinter.printRecord(
                    data.get("RCP_SEQ"), data.get("RCP_NM"), data.get("RCP_WAY2"), data.get("RCP_PAT2"),
                    data.get("INFO_WGT"), data.get("INFO_ENG"), data.get("INFO_CAR"), data.get("INFO_PRO"),
                    data.get("INFO_FAT"), data.get("INFO_NA"), data.get("HASH_TAG"), data.get("ATT_FILE_NO_MAIN"),
                    data.get("ATT_FILE_NO_MK"), data.get("RCP_PARTS_DTLS"), data.get("MANUAL01"),
                    data.get("MANUAL_IMG01"), data.get("MANUAL02"), data.get("MANUAL_IMG02"), data.get("MANUAL03"),
                    data.get("MANUAL_IMG03"), data.get("MANUAL04"), data.get("MANUAL_IMG04"), data.get("MANUAL05"),
                    data.get("MANUAL_IMG05"), data.get("MANUAL06"), data.get("MANUAL_IMG06"), data.get("MANUAL07"),
                    data.get("MANUAL_IMG07"), data.get("MANUAL08"), data.get("MANUAL_IMG08"), data.get("MANUAL09"),
                    data.get("MANUAL_IMG09"), data.get("MANUAL10"), data.get("MANUAL_IMG10"), data.get("MANUAL11"),
                    data.get("MANUAL_IMG11"), data.get("MANUAL12"), data.get("MANUAL_IMG12"), data.get("MANUAL13"),
                    data.get("MANUAL_IMG13"), data.get("MANUAL14"), data.get("MANUAL_IMG14"), data.get("MANUAL15"),
                    data.get("MANUAL_IMG15"), data.get("MANUAL16"), data.get("MANUAL_IMG16"), data.get("MANUAL17"),
                    data.get("MANUAL_IMG17"), data.get("MANUAL18"), data.get("MANUAL_IMG18"), data.get("MANUAL19"),
                    data.get("MANUAL_IMG19"), data.get("MANUAL20"), data.get("MANUAL_IMG20"), data.get("RCP_NA_TIP")
            );
        }

        // 파일 닫기
        csvPrinter.flush();
        csvPrinter.close();
    }

    private static String getJsonResponseFromApi(String apiUrl) throws IOException {
        // API 호출
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        // 응답 받아오기
        int responseCode = connection.getResponseCode();
        StringBuilder jsonResponse = new StringBuilder();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                jsonResponse.append(line);
            }
            reader.close();
        }

        // 연결 종료
        connection.disconnect();

        return jsonResponse.toString();
    }
}
