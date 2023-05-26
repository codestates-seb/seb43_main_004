package com.mainproject.wrieating.auth.config;

import com.mainproject.wrieating.auth.filter.JwtAuthenticationFilter;
import com.mainproject.wrieating.auth.filter.JwtVerificationFilter;
import com.mainproject.wrieating.auth.handler.*;
import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.auth.utils.CustomAuthorityUtils;

import com.mainproject.wrieating.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity(debug = true)
@AllArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {
    private final CustomAuthorityUtils authorityUtils;
    private final CustomCorsConfiguration corsConfiguration;
    private final MemberRepository memberRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()

                .csrf().disable()
                .cors().configurationSource(corsConfiguration)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()

                .apply(new CustomFilterConfigurer())
                .and()

                .authorizeHttpRequests(authorize -> authorize
                        //TODO antMatchers 지정필요
                        //멤버십
                        .antMatchers(HttpMethod.POST, "/members/signup").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/emailcheck").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/sendmail").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/findpassword/sendmail").permitAll()
                        .antMatchers(HttpMethod.POST, "/members/nicknamecheck").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/findpassword").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/mypage/update").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/members/mypage/passwordupdate").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/myprofile").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/leaveid").hasRole("USER")
                        // 일기 관리
                        .antMatchers(HttpMethod.POST, "/diaries/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/diaries/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/diaries/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/diaries/**").hasRole("USER")

                        // 아카이브
                        .antMatchers(HttpMethod.GET,"/recipes/**").permitAll()
                        .antMatchers(HttpMethod.GET,"/nutrient/**").permitAll()

                        // 레시피 추천
                        .antMatchers(HttpMethod.POST,"/recommend-recipe").hasRole("USER")
                );

        return http.build();
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
//    }

    // PasswordEncoder Beans 객체 생성
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public JwtTokenizer jwtTokenizer() {
        return new JwtTokenizer();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer(), memberRepository);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer(), authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
