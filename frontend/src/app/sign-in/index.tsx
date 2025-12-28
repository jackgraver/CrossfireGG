"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { validateEmail } from "@/lib/SignInUp.util";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import OSSForm from "@/shared/OSSForm/OSSForm";
import BaseInput from "@/shared/OSSForm/BaseInput/BaseInput";
import PasswordInput from "@/shared/OSSForm/PasswordInput/PasswordInput";
import { useUser } from "@/context/UserContext";
import UserForm from "@/shared/UserForm";
import { PromiseReturn } from "@/types/Types";

export const Route = createFileRoute("/sign-in/")({
    component: SignIn,
});

interface SignInResponse {
    access_token: string;
}

interface SignInError {
    detail: string;
}
type User = {
    user_id: string;
    user_name: string;
    email: string;
    roles: string[];
};

function SignIn() {
    const router = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useUser(); // ✅ move this OUTSIDE the mutation

    const signInMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            api.post<SignInResponse>("/user/sign-in", credentials),
        onSuccess: async (data) => {
            try {
                const userData = await api.get<User>("/user/user-role");
                setUser(userData); // ✅ now typed correctly
                // router.push("/");
            } catch (err) {
                console.error("Post-login setup failed:", err);
            }
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.detail || "Login failed";
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

    const handleSubmit = async (e: React.FormEvent): Promise<PromiseReturn> => {
        e.preventDefault();

        try {
            // Reset previous error
            setEmailError("");

            if (!validateEmail(email)) {
                setEmailError("Please enter a valid email address");
                return { success: false, result: null };
            }
            signInMutation.mutate({ email, password });

            return { success: true, result: null };
        } catch (err) {
            console.error("Submission error:", err);
            // return failure
            return { success: false, result: null };
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
                    disabled={signInMutation.isPending}
                    error={emailError}
                    success={validateEmail}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={signInMutation.isPending}
                />
            </OSSForm>
        </UserForm>
    );
}

// <OSSForm onSubmit={handleSubmit}>
//     {/* <input
//         type="email"
//         placeholder="Email address"
//         value={email}
//         onChange={handleEmailChange}
//         disabled={signInMutation.isPending}
//         className={`w-full border px-4 py-2 ${
//             emailError ? "border-red-500" : "border-border"
//         } rounded-md bg-secondBg hover:border-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
//     /> */}
//     <BaseInput
//         type="email"
//         placeholder="Email address"
//         value={email}
//         onChange={handleEmailChange}
//         disabled={signInMutation.isPending}
//         error={emailError}
//     />
//     {/* <input
//         type={showPassword ? "text" : "password"}
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         disabled={signInMutation.isPending}
//         className="w-full rounded-md border border-border bg-secondBg px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
//     /> */}
//     <PasswordInput
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         disabled={signInMutation.isPending}
//     />
// </OSSForm>
// {/* <form className="w-full space-y-4" onSubmit={handleSubmit}>
//     <div>
//         <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={handleEmailChange}
//             disabled={signInMutation.isPending}
//             className={`w-full border px-4 py-2 ${
//                 emailError
//                     ? "border-red-500"
//                     : "border-border"
//             } rounded-md bg-secondBg hover:border-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50`}
//         />
//         {emailError && (
//             <p className="mt-1 text-sm text-red-500">
//                 {emailError}
//             </p>
//         )}
//     </div>
//     <div className="relative">
//         <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             disabled={signInMutation.isPending}
//             className="w-full rounded-md border border-border bg-secondBg px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
//         />
//         <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             disabled={signInMutation.isPending}
//             className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
//         >
//             {showPassword ? (
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                 >
//                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                     <path
//                         fillRule="evenodd"
//                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             ) : (
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                         clipRule="evenodd"
//                     />
//                     <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                 </svg>
//             )}
//         </button>
//     </div>
//     <button
//         type="submit"
//         disabled={signInMutation.isPending}
//         className="w-full rounded-md bg-secondBg px-4 py-2 text-textPrimary transition duration-200 hover:bg-thirdBg disabled:cursor-not-allowed disabled:opacity-50"
//     >
//         {signInMutation.isPending
//             ? "Signing In..."
//             : "Sign In"}
//     </button>
// </form> */}
