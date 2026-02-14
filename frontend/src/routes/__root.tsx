import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import NavBar from "@/components/NavBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/queryClient";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/contexts/auth";
import { DialogProvider } from "@/lib/dialog/DialogProvider";
import { NotFound } from "./not-found";
import Footer from "@/components/Footer";

let TanStackDevtools: any;
if (process.env.NODE_ENV !== "production") {
    TanStackDevtools =
        require("@tanstack/react-query-devtools").TanStackDevtools;
}

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
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    notFoundComponent: () => <NotFound />,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            try {
                                const theme = localStorage.getItem('theme');
                                if (theme === 'light') {
                                    document.documentElement.classList.remove('dark');
                                } else if (!theme || theme === 'dark') {
                                    document.documentElement.classList.add('dark');
                                }
                            } catch (e) {}
                        })();
                    `,
                    }}
                />
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
                            {process.env.NODE_ENV !== "production" && (
                                <TanStackDevtools
                                    config={{
                                        position: "bottom-right",
                                    }}
                                    plugins={[
                                        {
                                            name: "Tanstack Router",
                                            render: (
                                                <TanStackRouterDevtoolsPanel />
                                            ),
                                        },
                                    ]}
                                />
                            )}
                            <Scripts />
                        </DialogProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
