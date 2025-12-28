"use client";

import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext"; // or your auth hook/context

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const { user } = useUser(); // loading useful if user is fetched async

    useEffect(() => {
        if (!user) {
            navigate({ to: "/", replace: true });
        }
    }, [user, navigate]);

    if (!user) {
        return null; // or loading spinner
    }

    return <>{children}</>;
}
