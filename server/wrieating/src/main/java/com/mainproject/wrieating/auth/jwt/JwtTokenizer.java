package com.mainproject.wrieating.auth.jwt;

import com.mainproject.wrieating.exception.BusinessLogicException;
import com.mainproject.wrieating.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

public class JwtTokenizer {

    @Getter
    @Value("${jwt.key}")
    @Setter
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    @Setter
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    @Setter
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodeSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodeSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)    // 토큰 제목
                .setIssuedAt(Calendar.getInstance().getTime()) // 발급시간
                .setExpiration(expiration)  // 만료시간
                .signWith(key)  // 알고리즘, 시크릿키
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)    // 토큰 제목
                .setIssuedAt(Calendar.getInstance().getTime())  // 발급시간
                .setExpiration(expiration)  // 만료시간
                .signWith(key)  // 알고리즘, 시크릿키
                .compact();
    }

    // 검증 후 , Claims 를 반환하는 용도
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // 단순히 검증만 하는 용도로 쓰일 경우
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    // 토큰 유효시간 얻는 메서드
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expriration = calendar.getTime();

        return expriration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey){
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public Long getMemberId(String token) {
        if (token == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        } else {
            long memberId = parseToken(token).get("memberId", Long.class);
            return memberId;
        }
    }

    private Claims parseToken(String token) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));
        String jws = token.replace("Bearer ", "");
        Claims claims;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jws)
                    .getBody();
        }   catch (ExpiredJwtException e) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        System.out.println(claims);
        return claims;
    }
}
