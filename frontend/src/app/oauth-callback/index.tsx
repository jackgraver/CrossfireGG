import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/oauth-callback/")({
    component: OAuthCallback,
});

function OAuthCallback() {
    useEffect(() => {
        // Send message to parent window that OAuth is complete
        if (window.opener) {
            window.opener.postMessage({ type: "oauth-success" }, "*");
            window.close();
        } else {
            // If no opener, redirect to home
            window.location.href = "/";
        }
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <div className="mb-4 text-2xl">✓</div>
                <p>Authentication successful!</p>
                <p className="text-sm text-gray-400">This window will close automatically...</p>
            </div>
        </div>
    );
}
