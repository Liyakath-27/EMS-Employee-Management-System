package com.emp_management.ems_spring_boot.service;

import com.emp_management.ems_spring_boot.dto.EmpDto;
import org.springframework.data.domain.Page;
import java.util.List;

public interface EmpService {

    EmpDto createEmployee(EmpDto employeeDto);
    EmpDto getEmployeeById(Long empId);
    EmpDto updateEmployee(Long empId, EmpDto updatedEmployee);
    void deleteEmployee(Long empId);
    List<EmpDto> searchEmployees(String query);
    // Search with Pagination + Sorting
    Page<EmpDto> searchEmployees(String query, int pageNo, int pageSize, String sortBy, String sortDir);
    // Get All with Pagination + Sorting
    Page<EmpDto> getAllEmployees(int pageNo, int pageSize, String sortBy, String sortDir);
}