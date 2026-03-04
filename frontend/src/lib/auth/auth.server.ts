import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
    const cookie = getRequestHeader("cookie");
    const res = await fetch("http://localhost:5000/user/me", {
        headers: {
            ...(cookie ? { cookie } : {}),
        },
    });
    const user = await res.json();

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
