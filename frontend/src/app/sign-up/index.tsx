import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { authClient } from "@/lib/auth-client";
import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import UserForm from "@/shared/UserForm";
import { PromiseReturn } from "@/types/Types";

export const Route = createFileRoute("/sign-up/")({
    component: SignUp,
});

function SignUp() {
    const navigate = useNavigate();
    const [isSigningUp, setIsSigningUp] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

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

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword && newConfirmPassword !== password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    const handleEmailPasswordSubmit = async (
        e: React.FormEvent,
    ): Promise<PromiseReturn> => {
        e.preventDefault();
        setEmailError("");

        if (!name.trim()) {
            setEmailError("Please enter your name");
            return { success: false, result: null };
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return { success: false, result: null };
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return { success: false, result: null };
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return { success: false, result: null };
        }

        setIsSigningUp(true);
        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/",
            });

            if (error) {
                setEmailError(error.message || "Sign up failed");
                return { success: false, result: null };
            }

            setTimeout(() => {
                navigate({ to: "/" });
            }, 500);
            return { success: true, result: null };
        } catch (error: any) {
            setEmailError(error.message || "Sign up failed");
            return { success: false, result: null };
        } finally {
            setIsSigningUp(false);
        }
    };

    const handleFaceitSignUp = async () => {
        setIsSigningUp(true);
        try {
            await authClient.signIn.oauth2({
                providerId: "faceit",
                callbackURL: "/",
            });
        } catch (error: any) {
            setEmailError(error.message || "Faceit sign up failed");
            setIsSigningUp(false);
        }
    };

    return (
        <UserForm>
            <h1 className="text-textPrimary mb-2 text-2xl font-bold">
                Create Account
            </h1>
            <p className="text-textSecondary mb-6">
                Already have an account?{" "}
                <a
                    href="/sign-in"
                    className="text-blue-500 hover:text-blue-400"
                >
                    Sign in
                </a>
            </p>
            <button
                type="button"
                onClick={handleFaceitSignUp}
                disabled={isSigningUp}
                className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg bg-[#ff5500] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#e64d00] disabled:opacity-50"
            >
                <img src="/faceit.png" alt="Faceit" className="h-5 w-5" />
                Continue with Faceit
            </button>
            <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-600"></div>
                <span className="text-textSecondary text-sm">
                    or sign up with email
                </span>
                <div className="h-px flex-1 bg-gray-600"></div>
            </div>
            <OSSForm onSubmit={handleEmailPasswordSubmit} submitLabel="Sign Up">
                <BaseInput
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSigningUp}
                />
                <BaseInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    disabled={isSigningUp}
                    error={emailError}
                    success={validateEmail}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSigningUp}
                />
                <PasswordInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={isSigningUp}
                    error={passwordError}
                />
            </OSSForm>
        </UserForm>
    );
}
