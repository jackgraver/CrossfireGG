import axios from "axios";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

export const apiGET = async <T = any>(url: string): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data as T;
};

export const apiPOST = async <T = any>(url: string, data: any): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data as T;
};

export const apiDELETE = async <T = any>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data as T;
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            //TODO: logout / refresh / redirect
        }
        return Promise.reject(error);
    },
);
