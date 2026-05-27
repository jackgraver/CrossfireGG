import { authClient } from "@/lib/auth/auth-client";

export default function FaceitSignInButton({ callbackURL }: { callbackURL: string }) {
    return (
        <button
            type="button"
            className="bg-faceit hover:bg-faceitSecondary flex cursor-pointer items-center gap-2 rounded-md py-2 pr-3 pl-2 text-sm font-bold text-black"
            onClick={async () => {
                if (import.meta.env.DEV) {
                    await authClient.signIn.email({
                        email: "root@admin.com",
                        password: "root-password",
                    });
                    return;
                }
                await authClient.signIn.oauth2({
                    providerId: "faceit",
                    callbackURL,
                });
            }}
        >
            <img src="/faceit.png" alt="Faceit" className="h-5 w-5" />
            Sign In With Faceit
        </button>
    );
}
