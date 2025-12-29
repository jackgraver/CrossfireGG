import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { useServerFn } from "@tanstack/react-start";
import { loginFn } from "@/lib/server/auth.server";
import { useAuth } from "@/contexts/auth";
import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import UserForm from "@/shared/UserForm";
import { PromiseReturn } from "@/types/Types";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in/")({
    component: SignIn,
});

function SignIn() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const login = useServerFn(loginFn);

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

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();
        setEmailError("");

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return { success: false, result: null };
        }

        setIsPending(true);
        try {
            const result = await login({ data: { email, password } });
            console.log("result", result);
            if (result?.error) {
                setEmailError(result.error);
                return { success: false, result: null };
            }
            setTimeout(() => {
                navigate({ to: "/" });
            }, 1500);
            return { success: true, result: null };
        } catch (error: any) {
            console.log("error", error);
            if (error.to) {
                throw error;
            }
            setEmailError(error.message || "Login failed");
            return { success: false, result: null };
        } finally {
            setIsPending(false);
        }
    };

    return (
        <UserForm>
            <h1 className="mb-2 text-2xl font-bold text-white">Welcome Back</h1>
            <OSSForm
                onSubmit={handleSubmit}
                submitLabel="Sign In"
                cancelLabel="Create Account"
                onCancel={() => {}}
            >
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
