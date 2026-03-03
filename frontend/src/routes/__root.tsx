import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
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
import { getThemeServerFn } from "@/lib/theme";

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
            { title: "CrossFire Season 4" },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    beforeLoad: async () => ({ theme: await getThemeServerFn() }),
    notFoundComponent: () => <NotFound />,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    const { theme } = Route.useRouteContext();
    return (
        <html className={theme} lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <DialogProvider>
                            <div className="flex min-h-screen flex-col">
                                <div className="mx-auto w-full max-w-8/12 flex-1">
                                    <NavBar />
                                    {children}
                                    <Footer />
                                </div>
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
