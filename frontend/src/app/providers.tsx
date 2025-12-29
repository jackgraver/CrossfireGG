import { UserProvider } from "@/context/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import ToastProvider from "@/shared/toast/ToastProvider";
import { queryClient } from "@/lib/queryClient";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <ToastProvider />
                {children}
                {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </UserProvider>
    );
}
