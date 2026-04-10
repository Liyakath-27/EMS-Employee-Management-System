package com.emp_management.ems_spring_boot.service.impl;

import com.emp_management.ems_spring_boot.dto.EmpDto;
import com.emp_management.ems_spring_boot.entity.Employee;
import com.emp_management.ems_spring_boot.exception.ResourceNotFoundException;
import com.emp_management.ems_spring_boot.mapper.EmpMapper;
import com.emp_management.ems_spring_boot.repo.EmpRepo;
import com.emp_management.ems_spring_boot.service.EmpService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpServiceImpl implements EmpService {

    private static final Logger log = LoggerFactory.getLogger(EmpServiceImpl.class);

    private final EmpRepo employeeRepo;
    private final EmpMapper empMapper;

    @Override
    public EmpDto createEmployee(EmpDto employeeDto) {
        log.info("Attempting to create new employee with email: {}", employeeDto.getEmail());

        Employee employee = empMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepo.save(employee);

        log.info("Employee created successfully with ID: {}", savedEmployee.getId());
        return empMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmpDto getEmployeeById(Long empId) {
        log.debug("Fetching employee with ID: {}", empId);

        Employee employee = employeeRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee doesn't exist with the given id: " + empId));

        log.debug("Employee found with ID: {}", empId);
        return empMapper.mapToEmployeeDto(employee);
    }

    @Override
    public EmpDto updateEmployee(Long empId, EmpDto updatedEmployee) {
        log.info("Attempting to update employee with ID: {}", empId);

        Employee employee = employeeRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee doesn't exist with the given id: " + empId));

        // Update all fields
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setJoiningDate(updatedEmployee.getJoiningDate());

        Employee updatedEmployeeObj = employeeRepo.save(employee);

        log.info("Employee updated successfully with ID: {}", empId);
        return empMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long empId) {
        log.warn("Attempting to delete employee with ID: {}", empId);

        employeeRepo.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee doesn't exist with the given id: " + empId));

        employeeRepo.deleteById(empId);

        log.info("Employee with ID {} deleted successfully", empId);
    }

    @Override
    public List<EmpDto> searchEmployees(String query) {
        if (query == null || query.trim().isEmpty()) {
            log.warn("Empty or null search query received");
            return List.of();
        }

        String trimmedQuery = query.trim();
        log.info("Searching employees with query: {}", trimmedQuery);

        List<Employee> employees = employeeRepo.searchEmployees(trimmedQuery);   // ← هنا هيشتغل دلوقتي
        List<EmpDto> result = empMapper.mapToEmployeeDtoList(employees);

        log.info("Found {} employees matching the query", result.size());
        return result;
    }

    @Override
    public Page<EmpDto> searchEmployees(String query, int pageNo, int pageSize, String sortBy, String sortDir) {
        if (query == null || query.trim().isEmpty()) {
            return getAllEmployees(pageNo, pageSize, sortBy, sortDir);
        }

        String trimmedQuery = query.trim();
        log.info("Searching employees with query: '{}' | Page: {} | Size: {}", trimmedQuery, pageNo, pageSize);

        sortBy = (sortBy == null || sortBy.trim().isEmpty()) ? "id" : sortBy.trim();
        sortDir = (sortDir == null || sortDir.trim().isEmpty()) ? "asc" : sortDir.trim().toLowerCase();

        Sort sort = sortDir.equals("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Employee> employeesPage = employeeRepo.searchEmployees(trimmedQuery, pageable);
        Page<EmpDto> result = employeesPage.map(empMapper::mapToEmployeeDto);

        log.info("Search returned {} employees (total pages: {})", result.getNumberOfElements(), result.getTotalPages());
        return result;
    }
    
    @Override
    public Page<EmpDto> getAllEmployees(int pageNo, int pageSize, String sortBy, String sortDir) {
        log.debug("Fetching all employees - Page: {}, Size: {}, SortBy: {}, SortDir: {}", 
                  pageNo, pageSize, sortBy, sortDir);

        sortBy = (sortBy == null || sortBy.trim().isEmpty()) ? "id" : sortBy.trim();
        sortDir = (sortDir == null || sortDir.trim().isEmpty()) ? "asc" : sortDir.trim().toLowerCase();

        Sort sort = sortDir.equals("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Employee> employeesPage = employeeRepo.findAll(pageable);
        Page<EmpDto> result = employeesPage.map(empMapper::mapToEmployeeDto);

        log.debug("Retrieved {} employees (total pages: {})", 
                  result.getNumberOfElements(), result.getTotalPages());

        return result;
    }
}