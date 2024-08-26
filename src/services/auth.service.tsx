import { loginDto, loginResponseDto } from '../dto/auth.dto';
import api from './apiService';

// Example of a GET request
export const fetchData = async (endpoint: string) => {
    try {
        const response = await api.get(endpoint);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const loginService = async (data: loginDto): Promise<loginResponseDto> => {
    try {
        const response = await api.post('/user/login', data);
        return response.data.data;

    } catch (error) {
        throw error;
    }
};

export const registerService = async (data: loginDto): Promise<loginResponseDto> => {
    try {
        const response = await api.post('/user/register', data);
        return response.data.data;
    } catch (error) {
        throw error;

    }
};

export const logoutService = async (data: { email: string }): Promise<any> => {
    try {
        const response = await api.post('/user/logout', data);
        return response.data.data;
    } catch (error) {
        throw error;

    }
}