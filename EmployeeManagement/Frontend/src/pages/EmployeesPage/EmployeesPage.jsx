import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GitHubLink from '../../components/GitHubLink/GitHubLink';
import ResizableBackground from '../../components/ResizableBackground/ResizableBackground';
import { getEmployees,  deleteEmployee } from '../../services/employeeService';
import '../../styles/global.css';

const EmployeesPage = ({ handleEdit = () => {}, refreshKey = () => {} }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

      // Trigger fetchEmployees whenever refreshKey changes
    React.useEffect(() => {
        fetchEmployees();
    }, [refreshKey]);

    const fetchEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            await deleteEmployee(id);
            fetchEmployees(); // Refresh the list
        }
    };

    function isEmptyFunction(func) {
        if (typeof func !== "function") return false; // Ensure it's a function
        const functionBody = func.toString().replace(/\s+/g, ""); // Remove whitespace
        return functionBody === "function(){}" || functionBody === "()=>{}"; // Empty function formats
    }

    return (
        <div>
            <ResizableBackground />
            <GitHubLink filePath="pages/EmployeesPage/EmployeesPage.js" />
            <Helmet>
                <title>Employee Management System - Employee List</title>
            </Helmet>
            <h2>Employee List</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.employeeId}>
                            <td>{emp.employeeId}</td>
                            <td className="td-left-align">{emp.firstName} {emp.lastName}</td>
                            <td className="td-left-align">{emp.email}</td>
                            <td>
                                <div className="button-container">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(emp)}
                                        hidden={isEmptyFunction(handleEdit)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(emp.employeeId)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesPage;
