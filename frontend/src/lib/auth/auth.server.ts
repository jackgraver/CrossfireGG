import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
    const cookie = getRequestHeader("cookie");
    const userAgent = getRequestHeader("user-agent");
    const base = import.meta.env.VITE_API_BASE_URL;

    try {
        const res = await fetch(`${base}/user/me`, {
            headers: {
                ...(cookie ? { cookie } : {}),
                ...(userAgent ? { "user-agent": userAgent } : {}),
                accept: "application/json",
            },
        });

        if (!res.ok) {
            return await next({ context: { user: null } });
        }

        const user = await res.json();

        return await next({
            context: {
                user: user,
            },
        });
    } catch (err) {
        return await next({ context: { user: null } });
    }
});

export const getUserMeServerFn = createServerFn({ method: "GET" })
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        return context.user;
    });
