import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-1/2 flex-col items-center justify-center p-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
            <p className="text-lg text-gray-500">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="mt-4 rounded bg-firstBg px-3 pb-2 pt-1 text-xl font-semibold text-textPrimary hover:bg-secondBg"
            >
                Go Home
            </Link>
        </div>
    );
}
