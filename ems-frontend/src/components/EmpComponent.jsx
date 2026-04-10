import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee, getEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EmpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [salary, setSalary] = useState('');
    const [joiningDate, setJoiningDate] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    const emp = response.data.data;   // ← extractData
                    setFirstName(emp.firstName || '');
                    setLastName(emp.lastName || '');
                    setEmail(emp.email || '');
                    setDepartment(emp.department || '');
                    setSalary(emp.salary || '');
                    setJoiningDate(emp.joiningDate || '');
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = {
            firstName,
            lastName,
            email,
            department,
            salary: salary ? parseFloat(salary) : null,     // مهم: تحويل لـ Number
            joiningDate: joiningDate || null
        };

        const apiCall = id 
            ? updateEmployee(id, employee) 
            : createEmployee(employee);

        apiCall
            .then((response) => {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success'
                });
                navigate('/employees');
            })
            .catch(error => {
                if (error.response?.status === 400) {
                    // Validation errors from backend
                    const errorData = error.response.data.data || error.response.data;
                    setErrors(errorData);
                    Swal.fire('Validation Error', 'Please check the highlighted fields', 'error');
                } else {
                    Swal.fire('Error!', 'Something went wrong', 'error');
                }
            });
    };

    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 shadow'>
                    <h2 className='text-center mt-3'>{id ? 'Update Employee' : 'Add Employee'}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateEmployee}>

                            <div className='row'>
                                <div className='form-group col-md-6 mb-3'>
                                    <label className='form-label'>First Name:</label>
                                    <input 
                                        type='text' 
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                    />
                                    {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                </div>

                                <div className='form-group col-md-6 mb-3'>
                                    <label className='form-label'>Last Name:</label>
                                    <input 
                                        type='text' 
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                    />
                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Email:</label>
                                <input 
                                    type='email' 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Department:</label>
                                <select 
                                    className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                                    value={department} 
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>

                            <div className='row'>
                                <div className='form-group col-md-6 mb-3'>
                                    <label className='form-label'>Salary ($):</label>
                                    <input 
                                        type='number' 
                                        step="0.01"
                                        className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                                        value={salary} 
                                        onChange={(e) => setSalary(e.target.value)} 
                                    />
                                    {errors.salary && <div className='invalid-feedback'>{errors.salary}</div>}
                                </div>

                                <div className='form-group col-md-6 mb-3'>
                                    <label className='form-label'>Joining Date:</label>
                                    <input 
                                        type='date' 
                                        className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`}
                                        value={joiningDate} 
                                        onChange={(e) => setJoiningDate(e.target.value)} 
                                    />
                                    {errors.joiningDate && <div className='invalid-feedback'>{errors.joiningDate}</div>}
                                </div>
                            </div>

                            <button type="submit" className='btn btn-success w-100 mt-3'>
                                {id ? 'Update Employee' : 'Save Employee'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpComponent;