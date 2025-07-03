"use client";

import "./sign-up.css";

import { useEffect, useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";

import { FaSpinner } from "react-icons/fa";
import { link } from "fs";

interface SignUpResponse {
    access_token: string;
}

interface SignUpError {
    detail: string;
}

export default function SignUp() {
    const router = useRouter();

    const [showFaceitLinkSpinner, setShowFaceitLinkSpinner] = useState(false);
    const validFaceitLink =
        /^https:\/\/www\.faceit\.com\/[^\/]+\/players\/([a-zA-Z0-9_]{3,32})$/;

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [faceitLink, setFaceitLink] = useState("");
    const [faceitLinkError, setFaceitLinkError] = useState("");
    const [faceitLinkSuccess, setFaceitLinkSuccess] = useState(false);
    const [faceitID, setFaceitID] = useState("");
    const [internalID, setInternalID] = useState("");

    const [faceitTeam, setFaceitTeam] = useState<{ id: string; name: string }>({
        id: "",
        name: "",
    });

    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const extractFaceitLink = (link: string) => {
        const match = link.match(validFaceitLink);
        if (match) {
            return match[1];
        }
        return "";
    };

    const checkLinkBackend = async (link: string) => {
        try {
            setShowFaceitLinkSpinner(true);

            const response = await api.get<any>(
                `/test_faceit_link/${extractFaceitLink(link)}`,
            );
            return response;
        } catch (err) {
            setFaceitLinkError("Error");
            return null;
        } finally {
            setShowFaceitLinkSpinner(false);
        }
    };

    useEffect(() => {
        const handleLink = async (link: string) => {
            checkLinkBackend(faceitLink).then((data) => {
                console.log(data);
                if (data.player) {
                    setFaceitID(data.player.id);
                    setInternalID(data.player.i_id);
                    setFaceitLinkError("");
                    setFaceitLinkSuccess(true);
                } else {
                    setFaceitLinkError("Invalid Link or Player not found");
                }

                if (data.team) {
                    setFaceitTeam(data.team);
                } else {
                    setFaceitTeam({
                        id: "",
                        name: "No Team Found for Player.",
                    });
                }
            });
        };

        if (faceitLink === "") {
            setFaceitLinkError("");
            return;
        }

        if (!validFaceitLink.test(faceitLink)) {
            setFaceitLinkError(
                "Please match format - https://www.faceit.com/en/players/XXX",
            );
            setFaceitLinkSuccess(false);
            return;
        }

        handleLink(faceitLink);
    }, [faceitLink]);

    const signUpMutation = useMutation({
        mutationFn: (userData: {
            id: string;
            email: string;
            username: string;
            faceit_id: string;
            team_id: string;
            password: string;
        }) => api.post<SignUpResponse>("/sign-up", userData),
        onSuccess: (data) => {
            if (typeof window !== "undefined") {
                localStorage.setItem("access_token", data.access_token);
            }
            router.push("/");
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

        signUpMutation.mutate({
            id: internalID,
            email,
            username: email,
            faceit_id: faceitID,
            team_id: faceitTeam.id,
            password,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-firstBg p-8 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/OSSLOGO.png"
                        alt="OSS Logo"
                        className="h-32 w-32"
                    />
                    <h1 className="text-text-primary text-2xl font-bold">
                        Create Account
                    </h1>
                    <form className="w-full space-y-4" onSubmit={handleSubmit}>
                        <div className="pb-2">
                            <span className="text-xs text-textSecondary">
                                Email <span className="text-red-500">*</span>
                            </span>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={signUpMutation.isPending}
                                className={`w-full border px-4 py-2 ${
                                    emailError
                                        ? "border-red-500"
                                        : "border-border"
                                } rounded-md bg-secondBg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                            {emailError && (
                                <p className="mt-1 text-xs text-red-500">
                                    {emailError}
                                </p>
                            )}
                        </div>
                        <div className="relative flex-1 pb-2">
                            <div className="w-full">
                                <span className="text-xs text-textSecondary">
                                    Faceit Link • Optional
                                </span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="https://www.faceit.com/en/players/XXX"
                                        value={faceitLink}
                                        onChange={(e) =>
                                            setFaceitLink(e.target.value)
                                        }
                                        className={`focus"ring-blue-500 w-full rounded-md border border-border bg-secondBg px-4 py-2 pr-10 focus:border-transparent focus:outline-none focus:ring-2 ${faceitLinkError !== "" ? "border-red-500" : ""} ${faceitLinkSuccess ? "border-green-500" : ""}`}
                                    />
                                    {showFaceitLinkSpinner && (
                                        <FaSpinner
                                            size={24}
                                            className="pointer-events-none absolute right-3 top-1/2 translate-y-full animate-spin text-gray-500"
                                        />
                                    )}
                                </div>
                            </div>
                            <p className="text-text-secondary hidden:block absolute mt-1 text-xs text-red-500">
                                {faceitLinkError}
                            </p>
                        </div>
                        <div className="relative flex-1">
                            <span className="text-xs text-textSecondary">
                                Faceit Team
                            </span>
                            <input
                                type="text"
                                placeholder="Team"
                                value={faceitTeam.name}
                                disabled={true}
                                className="w-full rounded-md border border-border bg-secondBg px-4 py-2 disabled:opacity-50"
                            />
                        </div>
                        <div className="w-full pb-2">
                            <span className="text-xs text-textSecondary">
                                Password <span className="text-red-500">*</span>
                            </span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={signUpMutation.isPending}
                                    className="w-full rounded-md border border-border bg-secondBg px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    disabled={signUpMutation.isPending}
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
                        </div>
                        <div className="w-full pb-2">
                            <span className="text-xs text-textSecondary">
                                Confirm Password
                                <span className="text-red-500"> *</span>
                            </span>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    disabled={signUpMutation.isPending}
                                    className={`w-full border px-4 py-2 ${
                                        passwordError
                                            ? "border-red-500"
                                            : "border-border"
                                    } rounded-md bg-secondBg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    disabled={signUpMutation.isPending}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
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
                        </div>
                        {passwordError && (
                            <p className="mt-1 text-xs text-red-500">
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
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                            />
                            <label
                                htmlFor="privacy"
                                className="text-text-secondary ml-2 block text-xs"
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
                            className="text-text-primary w-full rounded-md bg-blue-600 px-4 py-2 transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
