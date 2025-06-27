import { useState } from "react";
import { validateEmail } from "./SignInUp.util";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";

interface SignUpResponse {
    access_token: string;
}

interface SignUpError {
    detail: string;
}

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [faceitName, setFaceitName] = useState("");
    const [faceitTeam, setFaceitTeam] = useState("");
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const signUpMutation = useMutation({
        mutationFn: (userData: {
            email: string;
            username: string;
            password: string;
        }) => api.post<SignUpResponse>("/sign-up", userData),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            navigate("/");
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.detail || "Sign Up failed";
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

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword && newConfirmPassword !== password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        if (!privacyAgreed) {
            alert("Please agree to the privacy policy");
            return;
        }

        signUpMutation.mutate({ email, username: faceitName, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-bg p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/OSSLOGO.png"
                        alt="OSS Logo"
                        className="w-32 h-32"
                    />
                    <h1 className="text-2xl font-bold text-text-primary">
                        Create Account
                    </h1>
                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Faceit Name"
                                    value={faceitName}
                                    onChange={(e) =>
                                        setFaceitName(e.target.value)
                                    }
                                    disabled={signUpMutation.isPending}
                                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-bg-light"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Faceit Team"
                                    value={faceitTeam}
                                    onChange={(e) =>
                                        setFaceitTeam(e.target.value)
                                    }
                                    disabled={signUpMutation.isPending}
                                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-bg-light"
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={signUpMutation.isPending}
                                className={`w-full px-4 py-2 border ${
                                    emailError
                                        ? "border-red-500"
                                        : "border-border"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-bg-light`}
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">
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
                                disabled={signUpMutation.isPending}
                                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-bg-light"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                disabled={signUpMutation.isPending}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
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
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                disabled={signUpMutation.isPending}
                                className={`w-full px-4 py-2 border ${
                                    passwordError
                                        ? "border-red-500"
                                        : "border-border"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-bg-light`}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                disabled={signUpMutation.isPending}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
                            >
                                {showConfirmPassword ? (
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
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">
                                {passwordError}
                            </p>
                        )}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="privacy"
                                checked={privacyAgreed}
                                onChange={(e) =>
                                    setPrivacyAgreed(e.target.checked)
                                }
                                disabled={signUpMutation.isPending}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                            />
                            <label
                                htmlFor="privacy"
                                className="ml-2 block text-sm text-text-secondary"
                            >
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    privacy policy
                                </a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={signUpMutation.isPending}
                            className="w-full bg-bg-light text-text-primary py-2 px-4 rounded-md hover:bg-bg-extra-light transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {signUpMutation.isPending
                                ? "Creating Account..."
                                : "Sign Up"}
                        </button>
                    </form>
                    <p className="text-text-secondary">
                        Already have an account?{" "}
                        <a
                            href="/sign-in"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
