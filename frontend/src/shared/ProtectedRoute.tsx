import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/auth";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate({ to: "/sign-in", replace: true });
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return null;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
