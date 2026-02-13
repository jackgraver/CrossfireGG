import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
    component: NotFound,
});

export function NotFound() {
    return (
        <div className="flex h-1/2 flex-col items-center justify-center p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-gray-500">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="bg-firstBg text-textPrimary hover:bg-secondBg mt-4 rounded px-3 pt-1 pb-2 text-xl font-semibold"
            >
                Go Home
            </Link>
        </div>
    );
}
