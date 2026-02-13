import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/contexts/auth";
import {
    Input,
    PasswordInput,
    SpinnerInput,
    Checkbox,
    SubmitButton,
} from "@/components/shared/form";
import UserForm from "@/components/shared/UserForm";

export const Route = createFileRoute("/sign-up/")({
    component: SignUp,
});

const validFaceitLinkRegex =
    /^https:\/\/www\.faceit\.com\/[^\/]+\/players\/([a-zA-Z0-9_]{3,32})$/;

function extractFaceitUsername(link: string): string {
    const match = link.match(validFaceitLinkRegex);
    return match ? match[1] : "";
}

function SignUp() {
    const navigate = useNavigate();
    const { refetch } = useAuth();
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [faceitTeamName, setFaceitTeamName] = useState("");
    const [faceitTeamId, setFaceitTeamId] = useState("");

    const form = useForm({
        defaultValues: {
            email: "",
            faceitLink: "",
            password: "",
            confirmPassword: "",
            privacyAgreed: false,
        },
        // validators: {
        //     onBlur: signUpSchema,
        // },
        onSubmit: async ({ value }) => {
            setSubmitStatus("submitting");
            // try {
            //     const result = await signUp({
            //         data: {
            //             email: value.email,
            //             name: value.email.split("@")[0],
            //             password: value.password,
            //             team_id: faceitTeamId ? parseInt(faceitTeamId) : undefined,
            //         },
            //     });
            //     if (result?.error) {
            //         form.setFieldMeta("email", (prev) => ({
            //             ...prev,
            //             errors: [result.error],
            //         }));
            //         setSubmitStatus("error");
            //         return;
            //     }
            //     setSubmitStatus("success");
            //     await refetch();
            //     setTimeout(() => navigate({ to: "/" }), 1500);
            // } catch (error: any) {
            //     if (error.to) throw error;
            //     form.setFieldMeta("email", (prev) => ({
            //         ...prev,
            //         errors: [error.message || "Sign up failed"],
            //     }));
            //     setSubmitStatus("error");
            // }
        },
    });

    const isSubmitting = submitStatus === "submitting";

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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="w-full"
            >
                <form.Field name="email">
                    {(field) => (
                        <Input
                            value={field.state.value}
                            onChange={field.handleChange}
                            type="email"
                            placeholder="Email address"
                            disabled={isSubmitting}
                            name={""}
                        />
                    )}
                </form.Field>
                <form.Field
                    name="faceitLink"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            if (!value) {
                                setFaceitTeamName("");
                                setFaceitTeamId("");
                                return undefined;
                            }
                            if (!validFaceitLinkRegex.test(value)) {
                                setFaceitTeamName("");
                                setFaceitTeamId("");
                                return "Please match format - https://www.faceit.com/en/players/XXX";
                            }
                            // const username = extractFaceitUsername(value);
                            // try {
                            //     const response = await api.get<any>(
                            //         `/test_faceit_link/${username}`,
                            //     );
                            //     if (response.player) {
                            //         if (response.team) {
                            //             setFaceitTeamName(response.team.name);
                            //             setFaceitTeamId(response.team.id);
                            //         } else {
                            //             setFaceitTeamName("No Team Found");
                            //             setFaceitTeamId("");
                            //         }
                            //         return undefined;
                            //     } else {
                            //         setFaceitTeamName("");
                            //         setFaceitTeamId("");
                            //         return "Player not found";
                            //     }
                            // } catch {
                            //     setFaceitTeamName("");
                            //     setFaceitTeamId("");
                            //     return "Error validating Faceit link";
                            // }
                        },
                        onChangeAsyncDebounceMs: 500,
                    }}
                >
                    {(field) => (
                        <SpinnerInput
                            field={field}
                            type="url"
                            placeholder="Faceit Link"
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                {faceitTeamName && (
                    <div className="text-textSecondary bg-secondBg mb-2 rounded px-3 py-2 text-sm">
                        Team: {faceitTeamName}
                    </div>
                )}
                <form.Field name="password">
                    {(field) => (
                        <PasswordInput
                            field={field}
                            placeholder="Password"
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                <form.Field name="confirmPassword">
                    {(field) => (
                        <PasswordInput
                            field={field}
                            placeholder="Confirm Password"
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                <form.Field name="privacyAgreed">
                    {(field) => (
                        <Checkbox
                            field={field}
                            label={
                                <>
                                    I agree to the{" "}
                                    <a
                                        href="/privacy"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Privacy Policy
                                    </a>
                                </>
                            }
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                <div className="mt-6">
                    <SubmitButton status={submitStatus} label="Sign Up" />
                </div>
            </form>
        </UserForm>
    );
}
