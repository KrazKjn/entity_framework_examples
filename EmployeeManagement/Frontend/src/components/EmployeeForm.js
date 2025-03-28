import React, { useState, useEffect  } from 'react';
import { addEmployee,  updateEmployee } from '../services/employeeService';

const EmployeeForm = ({ employee = {}, onSubmitSuccess = () => {} }) => {
    // Fallback: No-op function

    // State initialization
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateHired: "",
        salary: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    // Synchronize formData with employee prop changes
    useEffect(() => {
        setFormData({
            firstName: employee.firstName || "",
            lastName: employee.lastName || "",
            email: employee.email || "",
            dateHired: employee.dateHired || "",
            salary: employee.salary || "",
        });
    }, [employee]); // Run effect whenever 'employee' changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            alert("First name is required.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required.");
            return;
        }

        if (!formData.lastName.trim()) {
            alert("Last name is required.");
            return;
        }

        try {
            setIsLoading(true);
            if (employee.employeeId) {
                await updateEmployee(employee.employeeId, formData);
            } else {
                await addEmployee(formData);
            }
            onSubmitSuccess();
        } catch (error) {
            console.error("An error occurred while saving the employee:", error);
            alert("Failed to save the employee. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Date Hired</label>
                <input
                    type="datetime-local"
                    name="dateHired"
                    value={formData.dateHired}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Salary</label>
                <input
                    type="number"
                    name="salary"
                    value={formData.salary}
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

export default EmployeeForm;
