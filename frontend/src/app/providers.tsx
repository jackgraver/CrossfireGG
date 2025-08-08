"use client";

import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import ToastProvider from "@/shared/toast/ToastProvider";

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider />
                {children}
            </QueryClientProvider>
        </UserProvider>
    );
}
