import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
    Checkbox,
    Input,
    PasswordInput,
    SubmitButton,
} from "@/components/shared/form";
import UserForm from "@/components/shared/UserForm";
import { authClient } from "@/lib/auth/auth-client";

export const Route = createFileRoute("/sign-in/")({
    component: SignIn,
});

function SignIn() {
    const navigate = useNavigate();
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        // validators: {
        //     onBlur: signInSchema,
        // },
        onSubmit: async ({ value }) => {
            setSubmitStatus("submitting");
            // try {
            //     const result = await login({ data: value });
            //     if (result?.error) {
            //         form.setFieldMeta("email", (prev) => ({
            //             ...prev,
            //             errors: [result.error],
            //         }));
            //         setSubmitStatus("error");
            //         return;
            //     }
            //     setSubmitStatus("success");
            //     setTimeout(() => navigate({ to: "/" }), 1500);
            // } catch (error: any) {
            //     if (error.to) throw error;
            //     form.setFieldMeta("email", (prev) => ({
            //         ...prev,
            //         errors: [error.message || "Login failed"],
            //     }));
            //     setSubmitStatus("error");
            // }
        },
    });

    const isSubmitting = submitStatus === "submitting";

    return (
        <UserForm>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Welcome Back
                <button
                    className="bg-border text-textSecondary hover:bg-secondBg flex-1 rounded px-4 py-2"
                    onClick={() => {
                        authClient.signIn.email({
                            email: "test@test2.com",
                            password: "password",
                        });
                    }}
                >
                    test
                </button>
                <button
                    className="bg-border text-textSecondary hover:bg-secondBg flex-1 rounded px-4 py-2"
                    onClick={() => {
                        authClient.signOut().catch((error) => {
                            console.error(error);
                        });
                    }}
                >
                    out
                </button>
            </h1>
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
                <form.Field name="password">
                    {(field) => (
                        <PasswordInput
                            field={field}
                            placeholder="Password"
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                <form.Field name="rememberMe">
                    {(field) => (
                        <Checkbox
                            field={field}
                            label="Remember me"
                            disabled={isSubmitting}
                        />
                    )}
                </form.Field>
                <div className="mt-6 flex flex-row gap-4">
                    <button
                        type="button"
                        onClick={() => navigate({ to: "/sign-up" })}
                        className="bg-border text-textSecondary hover:bg-secondBg flex-1 rounded px-4 py-2"
                    >
                        Create Account
                    </button>
                    <div className="flex-1">
                        <SubmitButton status={submitStatus} label="Sign In" />
                    </div>
                </div>
            </form>
        </UserForm>
    );
}
