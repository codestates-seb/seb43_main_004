package com.mainproject.wrieating.dataArchive.dbsource;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String DB_URL = "jdbc:mysql://database-deploy.c4spq6pcsznh.ap-northeast-2.rds.amazonaws.com:13306/wrieatingdb";
    private static final String DB_USER = "admin";
    private static final String DB_PASSWORD = "Wr!eating1125";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }
}
