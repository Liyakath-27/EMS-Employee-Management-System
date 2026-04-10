package com.emp_management.ems_spring_boot.controller;

import com.emp_management.ems_spring_boot.dto.ApiResponse;
import com.emp_management.ems_spring_boot.dto.EmpDto;
import com.emp_management.ems_spring_boot.service.EmpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmpController {

    private final EmpService empService;

    @PostMapping
    public ResponseEntity<ApiResponse<EmpDto>> createEmployee(
            @Valid @RequestBody EmpDto empDto) {

        EmpDto savedEmp = empService.createEmployee(empDto);
        ApiResponse<EmpDto> response = ApiResponse.success(
                "Employee created successfully", savedEmp);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmpDto>> getEmployeeById(@PathVariable("id") Long empId) {
        EmpDto emp = empService.getEmployeeById(empId);
        ApiResponse<EmpDto> response = ApiResponse.success(
                "Employee retrieved successfully", emp);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EmpDto>>> getAllEmployees(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

        Page<EmpDto> employeesPage = empService.getAllEmployees(pageNo, pageSize, sortBy, sortDir);

        ApiResponse<Page<EmpDto>> response = ApiResponse.success(
                "Employees retrieved successfully", employeesPage);

        return ResponseEntity.ok(response);
    }

    // ==================== الدالة الوحيدة للبحث ====================
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<EmpDto>>> searchEmployees(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

        Page<EmpDto> employeesPage = empService.searchEmployees(
                query != null ? query : "", 
                pageNo, 
                pageSize, 
                sortBy, 
                sortDir);

        String message = employeesPage.getContent().isEmpty() 
                ? "No employees found matching the search query" 
                : "Search completed successfully";

        ApiResponse<Page<EmpDto>> response = ApiResponse.success(message, employeesPage);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmpDto>> updateEmployee(
            @PathVariable("id") Long empId,
            @Valid @RequestBody EmpDto updatedEmployee) {

        EmpDto emp = empService.updateEmployee(empId, updatedEmployee);
        ApiResponse<EmpDto> response = ApiResponse.success(
                "Employee updated successfully", emp);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteEmployee(@PathVariable("id") Long empId) {
        empService.deleteEmployee(empId);
        ApiResponse<String> response = ApiResponse.success(
                "Employee deleted successfully", null);

        return ResponseEntity.ok(response);
    }
}