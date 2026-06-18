import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Intercept requests to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the backend returns a 401 (Unauthorized), the token is likely expired or invalid
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Force redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;