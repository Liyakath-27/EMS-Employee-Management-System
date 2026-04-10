import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/employees";

// Helper to extract data from ApiResponse
export const extractData = (response) => response.data.data;

export const getEmployees = (pageNo = 0, pageSize = 5, sortBy = 'id', sortDir = 'asc') => {
    return axios.get(`${EMPLOYEE_API_BASE_URL}`, {
        params: { pageNo, pageSize, sortBy, sortDir }
    });
};

export const searchEmployeesWithPagination = (query, pageNo = 0, pageSize = 5, sortBy = 'id', sortDir = 'asc') => {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/search`, {
        params: { 
            query: query || '',
            pageNo,
            pageSize,
            sortBy,
            sortDir
        }
    });
};

export const createEmployee = (employee) => {
    return axios.post(EMPLOYEE_API_BASE_URL, employee);
};

export const getEmployee = (id) => {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`);
};

export const updateEmployee = (id, employee) => {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`);
};