import axios from 'axios';
// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});
// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken'); // Get token from local storage (or other secure storage)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/#/login';
            console.error('Unauthorized access - maybe redirect to login.');
        } else if (error.response && error.response.status === 500) {
            console.error('Server error - try again later.');
        }
        return Promise.reject(error);
    }
);
export default api;