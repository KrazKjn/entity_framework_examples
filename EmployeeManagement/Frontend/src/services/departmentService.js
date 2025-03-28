/*
import axios from 'axios';

const API_BASE_URL = 'https://localhost:44388/api/Department';

export const getDepartments = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getDepartmentById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const addDepartment = async (department) => {
    const response = await axios.post(API_BASE_URL, department);
    return response.data;
};

export const updateDepartment = async (id, department) => {
    department.departmentId = id; // Ensure the ID is set in the department object
    const response = await axios.put(`${API_BASE_URL}/${id}`, department);
    return response.data;
};

export const deleteDepartment = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
*/
import apiService from "./apiService";

const API_BASE_URL = "https://localhost:44388/api/Department";

export const getDepartments = async () => apiService.getAll(API_BASE_URL);

export const getDepartmentById = async (id) => apiService.getById(API_BASE_URL, id);

export const addDepartment = async (department) => apiService.add(API_BASE_URL, department);

export const updateDepartment = async (id, department) => {
    department.departmentId = id; // Ensure the ID is set in the department object
    apiService.update(API_BASE_URL, id, department);
}

export const deleteDepartment = async (id) => apiService.delete(API_BASE_URL, id);