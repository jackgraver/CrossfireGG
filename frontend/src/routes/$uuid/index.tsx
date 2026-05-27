import { createFileRoute, notFound } from "@tanstack/react-router";
import { SIGN_IN_SECRET_PATH } from "@/routes/$uuid/util/sign-in-gate.config";
import FaceitSignInButton from "./-components/FaceitSignInButton";

export const Route = createFileRoute("/$uuid/")({
    beforeLoad: ({ params }) => {
        if (params.uuid !== SIGN_IN_SECRET_PATH) {
            throw notFound();
        }
    },
    component: SecretSignInPage,
});

function SecretSignInPage() {
    const callbackURL =
        typeof window === "undefined"
            ? `/${SIGN_IN_SECRET_PATH}`
            : `${window.location.origin}/${SIGN_IN_SECRET_PATH}`;

    return <FaceitSignInButton callbackURL={callbackURL} />;
}
