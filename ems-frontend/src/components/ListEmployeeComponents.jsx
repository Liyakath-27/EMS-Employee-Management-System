import React, { useState, useEffect } from 'react';
import { getEmployees, searchEmployeesWithPagination, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ListEmployeeComponents = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const pageSize = 5;
    const navigate = useNavigate();

    const fetchData = () => {
        setLoading(true);

        const apiCall = searchTerm.trim() !== ''
            ? searchEmployeesWithPagination(searchTerm, currentPage, pageSize, sortBy, sortDir)
            : getEmployees(currentPage, pageSize, sortBy, sortDir);

        apiCall
            .then((response) => {
                const pageData = response.data.data;
                setEmployees(pageData.content || []);
                setTotalPages(pageData.totalPages || 0);
                setTotalElements(pageData.totalElements || 0);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to load employees. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, sortBy, sortDir, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDir('asc');
        }
        setCurrentPage(0);
    };

    const handlePrevious = () => currentPage > 0 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);

    const addNewEmployee = () => navigate('/add-employee');
    const updateEmployee = (id) => navigate(`/edit-employee/${id}`);
    const viewEmployee = (id) => navigate(`/view-employee/${id}`);

    const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteEmployee(id)
                .then(() => {
                    toast.success('Employee deleted successfully');
                    fetchData();           // Refresh the list
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to delete employee');
                });
        }
    });
};

    return (
        <div className='container mt-4'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h2>List of Employees ({totalElements})</h2>
                <button className='btn btn-primary' onClick={addNewEmployee}>
                    Add New Employee
                </button>
            </div>

            <div className='row mb-4'>
                <div className='col-md-6'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Search by name, email or department...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {loading ? (
                <div className='text-center my-5'>
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Loading employees...</p>
                </div>
            ) : (
                <>
                    <table className='table table-bordered table-striped table-hover'>
                        <thead className='table-dark'>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID</th>
                                <th onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>First Name</th>
                                <th onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>Last Name</th>
                                <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td><span className="badge bg-info">{employee.department || 'N/A'}</span></td>
                                    <td>
                                        <button className='btn btn-sm btn-info me-2' onClick={() => viewEmployee(employee.id)}>View</button>
                                        <button className='btn btn-sm btn-warning me-2' onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className='text-center py-4'>No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                            <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 0}>
                                Previous
                            </button>
                            <span className="badge bg-primary fs-6 px-3 py-2">
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <button className="btn btn-secondary" onClick={handleNext} disabled={currentPage === totalPages - 1}>
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ListEmployeeComponents;