"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
    component: Error,
});

function Error() {
    return (
        <div className="flex h-1/2 flex-col items-center justify-center p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
                Sorry we ran into an issue.
            </h1>
            <Link
                to="/"
                className="mt-4 rounded bg-firstBg px-3 pb-2 pt-1 text-xl font-semibold text-textPrimary hover:bg-secondBg"
            >
                Go Home
            </Link>
        </div>
    );
}
