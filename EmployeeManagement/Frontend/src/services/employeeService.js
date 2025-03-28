/*
import axios from 'axios';

const API_BASE_URL = 'https://localhost:44388/api/Employee';

export const getEmployees = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post(API_BASE_URL, employee);
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    employee.employeeId = id; // Ensure the ID is set in the employee object
    const response = await axios.put(`${API_BASE_URL}/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
*/
import apiService from "./apiService";

const API_BASE_URL = "https://localhost:44388/api/Employee";

export const getEmployees = async () => apiService.getAll(API_BASE_URL);

export const getEmployeeById = async (id) => apiService.getById(API_BASE_URL, id);

export const addEmployee = async (employee) => apiService.add(API_BASE_URL, employee);

export const updateEmployee = async (id, employee) => {
    employee.employeeId = id; // Ensure the ID is set in the employee object
    apiService.update(API_BASE_URL, id, employee);
}

export const deleteEmployee = async (id) => apiService.delete(API_BASE_URL, id);