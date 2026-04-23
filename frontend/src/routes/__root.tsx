import { HeadContent, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "@/components/NavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/queryClient";
import "../styles.css";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/contexts/auth";
import { DialogProvider } from "@/lib/dialog/DialogProvider";
import { NotFound } from "./not-found";
import Footer from "@/components/Footer";
import { getUserMeServerFn } from "@/lib/auth/auth.server";
import { meQueryOptions } from "@/lib/auth/auth.query";
import ToastProvider from "@/components/shared/toast/ToastProvider";
import { cn } from "@/utils/cn";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "CROSSFIRE" },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    beforeLoad: async () => {
        const user =
            typeof window === "undefined"
                ? await getUserMeServerFn()
                : await queryClient.ensureQueryData(meQueryOptions());
        return { user };
    },
    notFoundComponent: () => <NotFound />,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    const { user } = Route.useRouteContext();

    const isHomePage = useRouterState({
        select: (state) => (state.resolvedLocation ?? state.location).pathname === "/",
    });

    return (
        <html className="dark" lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <DialogProvider>
                            <ToastProvider />
                            <div className="flex min-h-screen flex-col">
                                <div
                                    className={cn(
                                        "mx-auto w-full transition-[max-width] duration-500",
                                        !isHomePage && "lg:max-w-8/12",
                                    )}
                                >
                                    <NavBar user={user} isHomePage={isHomePage} />
                                    {children}
                                    
                                </div>
                                <Footer />
                            </div>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <Scripts />
                        </DialogProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
