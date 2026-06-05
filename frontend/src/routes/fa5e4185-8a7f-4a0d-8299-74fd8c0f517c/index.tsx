import { createFileRoute } from "@tanstack/react-router";
import FaceitSignInButton from "./-components/FaceitSignInButton";

export const Route = createFileRoute("/fa5e4185-8a7f-4a0d-8299-74fd8c0f517c/")({

    component: SecretSignInPage,
});

function SecretSignInPage() {
    const callbackURL =
        typeof window === "undefined"
            ? "/"
            : `${window.location.origin}/`;

    return <FaceitSignInButton callbackURL={callbackURL} />;
}
