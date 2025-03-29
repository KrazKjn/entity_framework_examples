import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm"; // Import EmployeeForm component
import DepartmentForm from "./DepartmentForm"; // Import DepartmentForm component
import EmployeesPage from "../pages/EmployeesPage/EmployeesPage"; // Import EmployeesPage component
import DepartmentsPage from "../pages/DepartmentsPage/DepartmentsPage"; // Import DepartmentsPage component
import MessageBox from "./MessageBox/MessageBox"; // Assuming you saved the component as MessageBox.js

const ParentComponent = () => {
    const [selectedEntity, setSelectedEntity] = useState(null); // Store selected entity (Department/Employee)
    const [entityType, setEntityType] = useState("Employee"); // Toggle between Employee or Department
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClose = (selectedValue) => {
        setResult(selectedValue); // Capture the result of the button clicked
        setShowModal(false); // Close the modal
      };
    
    const handleSuccess = () => {
        //alert(`${entityType} successfully saved!`);
        setShowModal(true); // Show the modal
        setSelectedEntity(null); // Clear selected entity after successful save
        // Trigger refresh by updating the refreshKey state
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleEdit = (entity) => {
        //alert(JSON.stringify(entity, null, 2));
        setSelectedEntity(entity); // Set the entity to be edited
        renderForm();
    };

    const renderForm = () => {
        if (entityType === "Employee") {
            return (
                <EmployeeForm
                    employee={selectedEntity || {}} // Pass Employee data for editing or empty object for creating
                    onSubmitSuccess={handleSuccess}
                />
            );
        } else if (entityType === "Department") {
            return (
                <DepartmentForm
                    department={selectedEntity || {}} // Pass Department data for editing or empty object for creating
                    onSubmitSuccess={handleSuccess}
                />
            );
        }
    };

    return (
        <div>
            <h1>Manage {entityType}s</h1>

            {/* Buttons to toggle between Employee and Department */}
            <div className="button-container">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setEntityType("Employee");
                        setSelectedEntity(null); // Clear selected entity when switching types
                    }}
                >
                    Manage Employees
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        setEntityType("Department");
                        setSelectedEntity(null); // Clear selected entity when switching types
                    }}
                >
                    Manage Departments
                </button>
            </div>
            {showModal && (
                <MessageBox
                    title="Save Confirmation"
                    message={`${entityType} successfully saved!`}
                    buttons={[
                        { label: "OK", value: "ok" }
                    ]}
                    onClose={handleClose}
                    defaultButton="ok"
                    timeout={5000} // Example: auto-closes in 5 seconds
                />
            )}

            {/* Render dynamic form based on entityType */}
            {renderForm()}

            {/* Example list of entities with Edit functionality */}
            <div>
                <ul>
                    {entityType === "Employee"
                        ? ( <EmployeesPage handleEdit={handleEdit} refreshKey={refreshKey} /> )
                        : ( <DepartmentsPage  handleEdit={handleEdit} refreshKey={refreshKey} /> )
                    }
                </ul>
            </div>
        </div>
    );
};

export default ParentComponent;