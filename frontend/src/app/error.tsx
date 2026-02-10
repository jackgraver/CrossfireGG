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
                className="bg-firstBg text-textPrimary hover:bg-secondBg mt-4 rounded px-3 pt-1 pb-2 text-xl font-semibold"
            >
                Go Home
            </Link>
        </div>
    );
}
