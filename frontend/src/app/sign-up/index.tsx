import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";

import { FaSpinner } from "react-icons/fa";
import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import SpinnerInput from "@/shared/OSSForm/SpinnerInput/SpinnerInput";
import UserForm from "@/shared/UserForm";
import { PromiseReturn } from "@/types/Types";

interface SignUpResponse {
    user: {
        id: number;
        name: string;
        email: string;
        team_id?: number;
        roles: string[];
    };
}

export const Route = createFileRoute("/sign-up/")({
    component: SignUp,
});

function SignUp() {
    const navigate = useNavigate();

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
            email: string;
            name: string;
            password: string;
            team_id?: number;
        }) => api.post<SignUpResponse>("/user/sign-up", userData),
        onSuccess: (data) => {
            navigate({ to: "/" });
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.error || "Sign Up failed";
            setEmailError(errorMessage);
        },
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (email.length === 0) setEmailError("");

        const newEmail = e.target.value;
        setEmail(newEmail);
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

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            if (!validateEmail(email)) {
                setEmailError("Please enter a valid email address");
                return { success: false, result: null };
            }
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return { success: false, result: null };
            }
            if (!privacyAgreed) {
                alert("Please agree to the privacy policy");
                return { success: false, result: null };
            }

            signUpMutation.mutate({
                email,
                name: email.split("@")[0],
                password,
                team_id: faceitTeam.id ? parseInt(faceitTeam.id) : undefined,
            });

            return { success: true, result: null };
        } catch (err) {
            console.error("Submission error:", err);
            // return failure
            return { success: false, result: null };
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <UserForm>
            <h1 className="text-textPrimary text-2xl font-bold">
                Create Account
            </h1>
            <p className="text-textSecondary">
                Already have an account?{" "}
                <a
                    href="/sign-in"
                    className="text-blue-600 hover:text-blue-800"
                >
                    Sign in
                </a>
            </p>
            <OSSForm onSubmit={handleSubmit} submitLabel="Sign Up">
                <BaseInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    error={emailError}
                    success={validateEmail}
                />
                <SpinnerInput
                    placeholder="Faceit Link"
                    value={faceitLink}
                    onChange={(e) => setFaceitLink(e.target.value)}
                    disabled={signUpMutation.isPending}
                    error={faceitLinkError}
                />
                <BaseInput
                    type="text"
                    placeholder="Faceit Team"
                    value={faceitTeam.name}
                    disabled={false}
                    onChange={(e) => {}}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={signUpMutation.isPending}
                />
            </OSSForm>
        </UserForm>
    );
}
