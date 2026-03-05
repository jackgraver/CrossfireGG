import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
    const headers = getRequestHeaders();
    const base = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${base}/user/me`, {
        headers: {
            ...headers,
            accept: "application/json",
        },
    });

    const text = await res.text();
    const user = text ? JSON.parse(text) : null;
    console.log("user", user);

    return await next({
        context: {
            user: user,
        },
    });
});

export const getUserMeServerFn = createServerFn({ method: "GET" })
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        return context.user;
    });
