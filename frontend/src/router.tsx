import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./app/not-found";

export function getRouter() {
    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultNotFoundComponent: NotFound,
    });

    return router;
}
