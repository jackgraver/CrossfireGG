import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import ToastProvider from "@/shared/toast/ToastProvider";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/contexts/auth";
import { DialogProvider } from "@/shared/dialog/DialogProvider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DialogProvider>
                    <ToastProvider />
                    {children}
                    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
                </DialogProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
