import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useServerFn } from "@tanstack/react-start";
import { loginFn } from "@/lib/server/auth.server";
import { signInSchema } from "@/schemas/auth";
import { Checkbox, Input, PasswordInput, SubmitButton } from "@/shared/form";
import UserForm from "@/shared/UserForm";
import { authClient } from "@/lib/auth-client";
import { toastService } from "@/shared/toast/toastService";
import { useAllTournaments } from "../tournament/-queries/tournamentsQueries";
import { api } from "@/api/client";
import { useAuth } from "@/contexts/auth";
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/sign-in/")({
    component: SignIn,
});

function SignIn() {
    const navigate = useNavigate();
    const login = useServerFn(loginFn);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">(
        "idle",
    );

    const { refetch } = useAuth();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validators: {
            onBlur: signInSchema,
        },
        onSubmit: async ({ value }) => {
            setSubmitStatus("submitting");
            try {
                const result = await login({ data: value });
                if (result?.error) {
                    form.setFieldMeta("email", (prev) => ({
                        ...prev,
                        errors: [result.error],
                    }));
                    setSubmitStatus("error");
                    return;
                }
                setSubmitStatus("success");
                setTimeout(() => navigate({ to: "/" }), 1500);
            } catch (error: any) {
                if (error.to) throw error;
                form.setFieldMeta("email", (prev) => ({
                    ...prev,
                    errors: [error.message || "Login failed"],
                }));
                setSubmitStatus("error");
            }
        },
    });

    const isSubmitting = submitStatus === "submitting";

    return (
        <UserForm>
            <h1 className="mb-2 text-2xl font-bold text-white">Welcome Back</h1>
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
                            field={field}
                            type="email"
                            placeholder="Email address"
                            disabled={isSubmitting}
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
