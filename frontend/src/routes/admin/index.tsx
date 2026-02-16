import {
    createFileRoute,
    Link,
    Outlet,
    useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";
import { Roles } from "@repo/types";

export const Route = createFileRoute("/admin/")({
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

    return (
        <div>
            <h1>Staff Dashboard</h1>

            <div>
                <h2>Tournaments</h2>
                <Link
                    to="/admin/tournament/$tournament_id"
                    params={{ tournament_id: "1" }}
                >
                    Manage Tournament
                </Link>
                <Link to="/admin/tournament/create">Create Tournament</Link>
            </div>
            <div>
                <h2>Staff</h2>
            </div>
        </div>
    );
}
