import axiosInstance from "./axios";

export const api = {
    get: async <T = any>(endpoint: string): Promise<T> => {
        const response = await axiosInstance.get<T>(endpoint);
        return response.data;
    },
    post: async <T = any>(endpoint: string, data?: any): Promise<T> => {
        const response = await axiosInstance.post<T>(endpoint, data);
        return response.data;
    },
    put: async <T = any>(endpoint: string, data?: any): Promise<T> => {
        const response = await axiosInstance.put<T>(endpoint, data);
        return response.data;
    },
    patch: async <T = any>(endpoint: string, data?: any): Promise<T> => {
        const response = await axiosInstance.patch<T>(endpoint, data);
        return response.data;
    },
    delete: async <T = any>(endpoint: string): Promise<T> => {
        const response = await axiosInstance.delete<T>(endpoint);
        return response.data;
    },
};
