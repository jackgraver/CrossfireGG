"use client";

import { useUser } from "@/context/UserContext"; // or your auth hook/context

export default function ProtectedElement({
    children,
    roles,
}: {
    children: React.ReactNode;
    roles?: string[];
}) {
    const { user } = useUser(); // loading useful if user is fetched async

    if (user && roles && user.roles.some((role) => roles.includes(role))) {
        return <>{children}</>;
    }
    if (!user) {
        return null; // or loading spinner
    }
}
