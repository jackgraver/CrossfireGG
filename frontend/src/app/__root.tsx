/// <reference types="vite/client" />

import Providers from "./providers";
import NavBar from "@/shared/NavBar";
import Footer from "@/shared/Footer";

import appCss from "./app.css?url";

import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { User } from "@/contexts/session";
import { fetchSession } from "@/lib/server/auth.server";

export const Route = createRootRouteWithContext<{ session: any }>()({
    beforeLoad: async ({ location }) => {
        const session = await fetchSession();

        return { session };
    },
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
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body className="flex min-h-screen flex-col">
                <Providers>
                    <NavBar session={Route.useRouteContext().session} />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                    <Footer />
                </Providers>
                <Scripts />
            </body>
        </html>
    );
}
