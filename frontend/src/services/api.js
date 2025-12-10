import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// Resume API
export const resumeAPI = {
    getAll: async () => {
        const response = await api.get('/resumes');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/resumes/${id}`);
        return response.data;
    },

    create: async (resumeData) => {
        const response = await api.post('/resumes', resumeData);
        return response.data;
    },

    update: async (id, resumeData) => {
        const response = await api.put(`/resumes/${id}`, resumeData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/resumes/${id}`);
        return response.data;
    },

    uploadPhoto: async (id, file) => {
        const formData = new FormData();
        formData.append('photo', file);
        const response = await api.post(`/resumes/${id}/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

// Templates API
export const templateAPI = {
    getAll: async () => {
        const response = await api.get('/templates');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/templates/${id}`);
        return response.data;
    },
};

export default api;
