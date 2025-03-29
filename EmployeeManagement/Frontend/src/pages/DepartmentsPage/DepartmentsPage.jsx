import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GitHubLink from '../../components/GitHubLink/GitHubLink';
import ResizableBackground from '../../components/ResizableBackground/ResizableBackground';
import { getDepartments, deleteDepartment } from '../../services/departmentService';
import '../../styles/global.css';

const DepartmentsPage = ({ handleEdit = () => {}, refreshKey = () => {} }) => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

      // Trigger fetchEmployees whenever refreshKey changes
    React.useEffect(() => {
      fetchDepartments();
    }, [refreshKey]);

    const fetchDepartments = async () => {
        const data = await getDepartments();
        setDepartments(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            await deleteDepartment(id);
            fetchDepartments(); // Refresh the list
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
            <GitHubLink filePath="pages/DepartmentsPage/DepartmentsPage.js" />
            <Helmet>
                <title>Employee Management System - Department List</title>
            </Helmet>
            <h2>Department List</h2>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.departmentId}>
                            <td>{dept.departmentId}</td>
                            <td className="td-left-align">{dept.departmentName}</td>
                            <td>
                                <div className="button-container">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(dept)}
                                        hidden={isEmptyFunction(handleEdit)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(dept.departmentId)}>
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

export default DepartmentsPage;