package com.emp_management.ems_spring_boot.mapper;

import com.emp_management.ems_spring_boot.dto.EmpDto;
import com.emp_management.ems_spring_boot.entity.Employee;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface EmpMapper {

    EmpDto mapToEmployeeDto(Employee employee);
    Employee mapToEmployee(EmpDto employeeDto);
    List<EmpDto> mapToEmployeeDtoList(List<Employee> employees);
}