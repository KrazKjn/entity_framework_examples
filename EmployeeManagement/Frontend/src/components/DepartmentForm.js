import React, { useState, useEffect  } from 'react';
import { addDepartment, updateDepartment } from '../services/departmentService';

const DepartmentForm = ({ department = {}, onSubmitSuccess = () => {} }) => {
    // Fallback: No-op function

    // State initialization
    const [formData, setFormData] = useState({
        departmentName: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // Synchronize formData with department prop changes
    useEffect(() => {
        setFormData({
            departmentName: department.departmentName || "",
        });
    }, [department]); // Run effect whenever 'department' changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.departmentName.trim()) {
            alert("Department name is required.");
            return;
        }

        try {
            setIsLoading(true);
            if (department.departmentId) {
                await updateDepartment(department.departmentId, formData);
            } else {
                await addDepartment(formData);
            }
            onSubmitSuccess();
        } catch (error) {
            console.error("An error occurred while saving the department:", error);
            alert("Failed to save the department. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Saving..." : "Submit"}
            </button>
        </form>
    );
};

export default DepartmentForm;
