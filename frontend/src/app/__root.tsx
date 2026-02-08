/// <reference types="vite/client" />

import Providers from "./-providers";
import NavBar from "@/shared/NavBar";
import Footer from "@/shared/Footer";

import appCss from "./app.css?url";

import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { title: "CrossFire Season 4" },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootLayout,
});

function RootLayout() {
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
            <body className="min-h-screen font-sans antialiased">
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <NavBar />
                        <div className="mx-auto w-full max-w-8/12 flex-1">
                            <main>
                                <Outlet />
                            </main>
                        </div>
                        <Footer />
                    </div>
                </Providers>
                <Scripts />
            </body>
        </html>
    );
}
