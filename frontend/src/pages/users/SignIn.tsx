import { useState } from "react";
import { validateEmail } from "./SignInUp.util";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface SignInResponse {
    access_token: string;
}

interface SignInError {
    detail: string;
}

export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const signInMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            api.post<SignInResponse>("/sign-in", credentials),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            navigate("/");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.detail || "Login failed";
            setEmailError(errorMessage);
        },
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail && !validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Reset previous error
        setEmailError("");

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        signInMutation.mutate({ email, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-bg p-8 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/OSSLOGO.png"
                        alt="OSS Logo"
                        className="h-32 w-32"
                    />
                    <h1 className="text-2xl font-bold text-text-primary">
                        Welcome Back
                    </h1>
                    <p className="text-text-secondary">
                        Haven't signed up yet?{" "}
                        <a
                            href="/sign-up"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Sign up
                        </a>
                    </p>
                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={signInMutation.isPending}
                                className={`w-full border px-4 py-2 ${
                                    emailError
                                        ? "border-red-500"
                                        : "border-border"
                                } rounded-md bg-bg-light focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-500">
                                    {emailError}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={signInMutation.isPending}
                                className="w-full rounded-md border border-border bg-bg-light px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                disabled={signInMutation.isPending}
                                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={signInMutation.isPending}
                            className="w-full rounded-md bg-bg-light px-4 py-2 text-text-primary transition duration-200 hover:bg-bg-extra-light disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {signInMutation.isPending
                                ? "Signing In..."
                                : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
