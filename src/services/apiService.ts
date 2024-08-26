import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API's base URL
    timeout: 10000, // Optional timeout setting (in milliseconds)
    headers: {
        'Authorization': 'Bearer' + sessionStorage.getItem('authToken'),
    },
});

export default api;