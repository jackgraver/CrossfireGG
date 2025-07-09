"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext"; // or your auth hook/context

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user } = useUser(); // loading useful if user is fetched async

    useEffect(() => {
        console.log(user);
        if (!user) {
            router.replace("/");
        }
    }, [user]);

    if (!user) {
        return null; // or loading spinner
    }

    return <>{children}</>;
}
