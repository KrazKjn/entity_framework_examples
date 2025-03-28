/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SaveEntityForm from '../components/SaveEntityForm.js'

const HomePage = () => {
    const navigate = useNavigate();

    const onSubmitSuccess = (entityType, entityName) => {
    
        // Display a success message
        alert(`${entityType} "${entityName}" has been saved successfully!`);
    
        // Navigate to the corresponding page after saving
        if (entityType === "Employee") {
            navigate("/employees");
        } else if (entityType === "Department") {
            navigate("/departments");
        }
    }
    
    return (
        <div>
            <SaveEntityForm entityType="Employee" onSubmitSuccess={onSubmitSuccess} />
            <SaveEntityForm entityType="Department" onSubmitSuccess={onSubmitSuccess} />
        </div>
    );
}

export default HomePage;
*/

import React from "react";
import "./HomePage.css"; // Optional custom styles

const HomePage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Right Content */}
                <div className="col-md-9 main-content">
                    <div className="content-area">
                        <h1>Welcome to the Employee Manager</h1>
                        <p>
                            Use the navigation menu on the left to manage employees, departments, and more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;