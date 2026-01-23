import { api } from "@/api/client";
import { authClient } from "./auth-client";
import { useQuery } from "@tanstack/react-query";

export function hasSession(session: any) {
    return !!session && Object.keys(session).length > 0;
}

async function fetchAuthBundle() {
    const [session, user] = await Promise.all([
        authClient.getSession(),
        api.get("/user/user-role").then(res => res.data),
    ]);

    return { session, user };
}

export function useAuthBundle() {
    return useQuery({
        queryKey: ["auth-bundle"],
        queryFn: fetchAuthBundle,
        staleTime: 60_000,
        retry: false,
    });
}
