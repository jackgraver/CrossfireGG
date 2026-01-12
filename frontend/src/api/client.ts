import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

// api.interceptors.response.use(
//     (response) => {
//         console.log("response", response.data);
//         return response.data;
//     },
//     (error) => Promise.reject(error),
// );

api.interceptors.request.use((config) => {
    const token = "temp"; //TODO: create token based access in backend
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            //TODO: logout / refresh / redirect
        }
        return Promise.reject(error);
    },
);
