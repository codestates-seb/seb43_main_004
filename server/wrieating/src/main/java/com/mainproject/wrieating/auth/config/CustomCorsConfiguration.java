package com.mainproject.wrieating.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;

//@Configuration
//public class CorsConfiguration implements WebMvcConfigurer {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOriginPatterns("http://localhost:3000", "https://d37e9ewzht4md2.cloudfront.net",
//                        "https://wrieating.kro.kr")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//}

@Configuration
public class CustomCorsConfiguration implements CorsConfigurationSource {

    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("https://d37e9ewzht4md2.cloudfront.net");
        configuration.addAllowedOrigin("https://wrieating.kro.kr");
        configuration.addAllowedMethod(HttpMethod.GET.name());
        configuration.addAllowedMethod(HttpMethod.POST.name());
        configuration.addAllowedMethod(HttpMethod.PUT.name());
        configuration.addAllowedMethod(HttpMethod.DELETE.name());
        configuration.addAllowedMethod(HttpMethod.PATCH.name());
        configuration.addAllowedMethod(HttpMethod.OPTIONS.name());
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        return configuration;
    }
}