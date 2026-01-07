import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { authClient, FRONTEND_URL } from "@/lib/auth-client";
import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import UserForm from "@/shared/UserForm";
import { PromiseReturn } from "@/types/Types";

export const Route = createFileRoute("/sign-in/")({
    component: SignIn,
});

function SignIn() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (email.length === 0) setEmailError("");
        setEmail(e.target.value);
    };

    const handleEmailBlur = () => {
        if (email === "") {
            setEmailError("");
            return;
        }
        setTimeout(() => {
            if (email && !validateEmail(email)) {
                setEmailError("Please enter a valid email address");
            } else {
                setEmailError("");
            }
        }, 0);
    };

    const handleEmailPasswordSubmit = async (
        e: React.FormEvent,
    ): Promise<PromiseReturn> => {
        e.preventDefault();
        setEmailError("");

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return { success: false, result: null };
        }

        setIsPending(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setEmailError(error.message || "Login failed");
                return { success: false, result: null };
            }

            setTimeout(() => {
                navigate({ to: "/" });
            }, 500);
            return { success: true, result: null };
        } catch (error: any) {
            setEmailError(error.message || "Login failed");
            return { success: false, result: null };
        } finally {
            setIsPending(false);
        }
    };

    const handleFaceitLogin = async () => {
        setIsPending(true);
        try {
            await authClient.signIn.oauth2({
                providerId: "faceit",
                callbackURL: FRONTEND_URL,
            });
        } catch (error: any) {
            console.error("OAuth error:", error);
            setEmailError(error.message || "Faceit login failed");
            setIsPending(false);
        }
    };

    return (
        <UserForm>
            <h1 className="mb-2 text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-textSecondary mb-6">
                Don't have an account?{" "}
                <a
                    href="/sign-up"
                    className="text-blue-500 hover:text-blue-400"
                >
                    Sign up
                </a>
            </p>
            <button
                type="button"
                onClick={handleFaceitLogin}
                disabled={isPending}
                className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg bg-[#ff5500] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#e64d00] disabled:opacity-50"
            >
                <img src="/faceit.png" alt="Faceit" className="h-5 w-5" />
                Continue with Faceit
            </button>
            <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-600"></div>
                <span className="text-textSecondary text-sm">
                    or sign in with email
                </span>
                <div className="h-px flex-1 bg-gray-600"></div>
            </div>
            <OSSForm onSubmit={handleEmailPasswordSubmit} submitLabel="Sign In">
                <BaseInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    disabled={isPending}
                    error={emailError}
                    success={validateEmail}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                />
            </OSSForm>
        </UserForm>
    );
}
