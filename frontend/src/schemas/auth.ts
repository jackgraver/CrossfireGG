import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
    .object({
        email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
        faceitLink: z
            .string()
            .regex(
                /^https:\/\/www\.faceit\.com\/[^\/]+\/players\/([a-zA-Z0-9_]{3,32})$/,
                "Please match format - https://www.faceit.com/en/players/XXX",
            )
            .optional()
            .or(z.literal("")),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        privacyAgreed: z.boolean().refine((val) => val === true, {
            message: "You must agree to the privacy policy",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
