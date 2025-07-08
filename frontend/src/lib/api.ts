// const BASE_URL = "https://backend-empty-fog-5756.fly.dev";
// const BASE_URL = "http://localhost:8000";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL_BASE;

console.log(process.env.NEXT_PUBLIC_API_URL_BASE);

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: any,
    headers: Record<string, string> = {},
): Promise<T> {
    const accessToken = localStorage.getItem("access_token");

    const finalHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error (${response.status}): ${error}`);
    }

    return await response.json();
}

export const api = {
    get: <T>(endpoint: string) => request<T>("GET", endpoint),
    post: <T>(endpoint: string, body?: any) =>
        request<T>("POST", endpoint, body),
    put: <T>(endpoint: string, body?: any) => request<T>("PUT", endpoint, body),
    delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
};
