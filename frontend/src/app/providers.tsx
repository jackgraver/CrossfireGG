import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import ToastProvider from "@/shared/toast/ToastProvider";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/auth";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastProvider />
                {children}
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </AuthProvider>
        </QueryClientProvider>
    );
}
