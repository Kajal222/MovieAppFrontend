import { MovieDto } from '@/dto/movie.dto';
import api from './apiService';

export const getmovieListService = async ( email: string ): Promise<MovieDto[]> => {
    try {
        const response = await api.get(`/movie/getmovieList?email=${email}`);
        return response.data.data;

    } catch (error) {
        throw error;
    }
};

export const addMovieService = async (data: any): Promise<any> => {
    try {
        const response = await api.post('/movie/addMovie', data);
        return response.data;
    } catch (error) {
        throw error;

    }
};

export const updateMovieService = async (data: any): Promise<any> => {
    try {
        const response = await api.post('/movie/updateMovie', data);
        return response.data;
    } catch (error) {
        throw error;

    }
};