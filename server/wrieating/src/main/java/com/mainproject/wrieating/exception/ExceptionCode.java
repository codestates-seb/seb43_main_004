package com.mainproject.wrieating.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_UNAUTHORIZED(401,"Unauthorized"),
    DIARY_NOT_FOUND(404, "Diary not found"),
    DIARY_EXIST(400, "Diary already exist"),
    MEMBER_MISMATCHED(401,"Member does not matched"),
    FOOD_NOT_FOUND(404,"Food data not found"),
    RECIPE_NOT_FOUND(404, "Recipe data not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
