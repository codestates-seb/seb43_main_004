package com.mainproject.wrieating.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    DIARY_NOT_FOUND(404, "Diary not found"),
    DIARY_EXIST(400, "Diary already exist");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}