package com.emp_management.ems_spring_boot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponseDto {

    private int statusCode;
    private String status;
    private String message;
    private LocalDateTime timestamp;
    private String path;        
}