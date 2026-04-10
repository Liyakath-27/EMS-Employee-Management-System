import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployee } from '../services/EmployeeService';

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployee(id).then((response) => {
            setEmployee(response.data.data);
        }).catch(error => console.error(error));
    }, [id]);

    if (!employee) return <div className='text-center mt-5'>Loading...</div>;

    return (
        <div className='container mt-5'>
            <div className='card col-md-6 offset-md-3 shadow-lg'>
                <div className='card-header bg-primary text-white text-center'>
                    <h3>Employee Details</h3>
                </div>
                <div className='card-body'>
                    <div className='row mb-3'>
                        <label className='fw-bold col-sm-4'>Full Name:</label>
                        <div className='col-sm-8'>{employee.firstName} {employee.lastName}</div>
                    </div>
                    <div className='row mb-3'>
                        <label className='fw-bold col-sm-4'>Email:</label>
                        <div className='col-sm-8'>{employee.email}</div>
                    </div>
                    <div className='row mb-3'>
                        <label className='fw-bold col-sm-4'>Department:</label>
                        <div className='col-sm-8'><span className="badge bg-info text-dark">{employee.department}</span></div>
                    </div>
                    <div className='row mb-3'>
                        <label className='fw-bold col-sm-4'>Salary:</label>
                        <div className='col-sm-8'>${employee.salary?.toLocaleString()}</div>
                    </div>
                    <div className='row mb-3'>
                        <label className='fw-bold col-sm-4'>Joined Date:</label>
                        <div className='col-sm-8'>{employee.joiningDate}</div>
                    </div>
                </div>
                <div className='card-footer text-center'>
                    <button className='btn btn-secondary' onClick={() => navigate('/employees')}>Back to List</button>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeComponent;