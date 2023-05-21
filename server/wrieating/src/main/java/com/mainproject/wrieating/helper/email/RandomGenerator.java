package com.mainproject.wrieating.helper.email;

import java.util.Random;

public class RandomGenerator {

    public static String generateRandomCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    public static void main(String[] args) {
        // 6자리 난수 생성 예시
        String randomCode = generateRandomCode(6);
        System.out.println("Random Code: " + randomCode);
    }
}
