import axios from 'axios';
// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API's base URL   
});
// Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Modify request config before sending it
        const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken'); // Get token from local storage (or other secure storage)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx will cause this function to trigger
        return response;
    },
    (error) => {
        // Any status code that falls outside the range of 2xx will cause this function to trigger
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            console.error('Unauthorized access - maybe redirect to login.');
        } else if (error.response && error.response.status === 500) {
            // Handle server error
            console.error('Server error - try again later.');
        }
        return Promise.reject(error);
    }
);
export default api;