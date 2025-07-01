const BASE_URL = "http://192.168.4.64:8000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: any,
    headers: Record<string, string> = {},
): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
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
