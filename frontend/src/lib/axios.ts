import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (apiKey) {
            config.headers["x-api-key"] = apiKey;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const url = originalRequest.url || "";
        const isAuthEndpoint =
            url.includes("/user/refresh") ||
            url.includes("/user/sign-in") ||
            url.includes("/user/sign-up");

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isAuthEndpoint
        ) {
            originalRequest._retry = true;

            try {
                await axiosInstance.post("/user/refresh");
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                originalRequest._retry = false;
                window.location.href = "/sign-in";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
