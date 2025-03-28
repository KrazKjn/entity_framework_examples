import axios from "axios";

const apiService = {
    getAll: async (baseUrl) => {
        const response = await axios.get(baseUrl);
        return response.data;
    },

    getById: async (baseUrl, id) => {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    },

    add: async (baseUrl, entity) => {
        const response = await axios.post(baseUrl, entity);
        return response.data;
    },

    update: async (baseUrl, id, entity) => {
        const response = await axios.put(`${baseUrl}/${id}`, entity);
        return response.data;
    },

    delete: async (baseUrl, id) => {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    },
};

export default apiService;