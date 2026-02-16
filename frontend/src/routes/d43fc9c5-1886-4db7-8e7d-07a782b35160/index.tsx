import { authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/lib/api/queryClient";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/d43fc9c5-1886-4db7-8e7d-07a782b35160/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const signIn = async () => {
        await authClient.signIn.email({
            email: "root@admin.com",
            password: "root-password",
        });

        queryClient.invalidateQueries({ queryKey: ["me"] });
        navigate({ to: "/" });
    };

    signIn();

    return null;
}
