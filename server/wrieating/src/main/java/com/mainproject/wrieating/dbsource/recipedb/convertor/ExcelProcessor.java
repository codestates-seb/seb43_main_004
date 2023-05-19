package com.mainproject.wrieating.dbsource.recipedb.convertor;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.*;

public class ExcelProcessor {
    public static void main(String[] args) {
        String inputFilePath = "C:\\Users\\keddy\\Desktop\\recipedb.xlsx";
        String outputFilePath = "C:\\Users\\keddy\\Desktop\\modified_file.xlsx";

        try {
            // 엑셀 파일 로드
            FileInputStream inputStream = new FileInputStream(new File(inputFilePath));
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            // 각 셀의 큰 따옴표 제거
            for (Row row : sheet) {
                for (Cell cell : row) {
                    if (cell.getCellType() == CellType.STRING) {
                        String value = cell.getStringCellValue();
                        value = value.replaceAll("^\"|\"$", "");  // 큰 따옴표 제거
                        cell.setCellValue(value);
                    }
                }
            }

            // 수정된 데이터 저장
            FileOutputStream outputStream = new FileOutputStream(outputFilePath);
            workbook.write(outputStream);
            workbook.close();
            inputStream.close();
            outputStream.close();

            System.out.println("Modified Excel file created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
