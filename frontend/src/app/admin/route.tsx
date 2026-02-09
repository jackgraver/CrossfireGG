import {
    createFileRoute,
    Outlet,
    redirect,
    useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";
import { Roles } from "@repo/types";

export const Route = createFileRoute("/admin")({
    component: Admin,
});

function Admin() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    if (isLoading) {
        return null;
    }

    if (!user || !user.roles || !user.roles.includes(Roles.ADMIN)) {
        navigate({ to: "/" });
    }

    return <Outlet />;
}
