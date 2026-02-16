import { authClient } from "@/lib/auth/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/d43fc9c5-1886-4db7-8e7d-07a782b35160/")({
    beforeLoad: async () => {
        await authClient.signIn.email({
            email: "root@admin.com",
            password: "root-password",
        });
        throw redirect({
            to: "/",
        });
    },
    component: RouteComponent,
});

function RouteComponent() {
    return null;
}
