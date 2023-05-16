package com.mainproject.wrieating.auth.config;

import com.mainproject.wrieating.auth.filter.JwtAuthenticationFilter;
import com.mainproject.wrieating.auth.filter.JwtVerificationFilter;
import com.mainproject.wrieating.auth.handler.MemberAccessDeniedHandler;
import com.mainproject.wrieating.auth.handler.MemberAuthenticationEntryPoint;
import com.mainproject.wrieating.auth.handler.MemberAuthenticationFailureHandler;
import com.mainproject.wrieating.auth.handler.MemberAuthenticationSuccessHandler;
import com.mainproject.wrieating.auth.jwt.JwtTokenizer;
import com.mainproject.wrieating.auth.utils.CustomAuthorityUtils;
import com.mainproject.wrieating.member.repository.MemberRepository;
import com.mainproject.wrieating.auth.utils.JwtUtils;

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

@AllArgsConstructor
@Configuration
@EnableWebSecurity(debug = true)
//@RequiredArgsConstructor
public class SecurityConfiguration {
    private final CustomAuthorityUtils authorityUtils;
    MemberRepository memberRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable()
                .and()
                .csrf().disable()
                .cors().and()
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
                        .antMatchers(HttpMethod.POST, "/*/signUp").permitAll()
// TODO                       .antMatchers(HttpMethod.POST, "/*/login").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/*/member").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/member/**").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET, "/*/member").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/*/member/**").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.DELETE, "/*/member").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE, "/*/member/**").hasRole("ADMIN")

                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils(jwtTokenizer());
    }

    @Bean
    public JwtTokenizer jwtTokenizer() {
        return new JwtTokenizer();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer());
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(memberRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtUtils(), authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
