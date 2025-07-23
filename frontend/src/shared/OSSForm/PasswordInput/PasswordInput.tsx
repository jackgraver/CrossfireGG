"use client";

import { useState } from "react";
import BaseInput from "../BaseInput/BaseInput"; // adjust path if needed
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordInput.module.css";

type PasswordInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
};

export default function PasswordInput({
    value,
    onChange,
    error,
    disabled = false,
    placeholder = "Password",
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            <BaseInput
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
            >
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={disabled}
                    className={styles.toggleButton}
                    tabIndex={-1}
                    aria-label={
                        showPassword ? "Hide password" : "Show password"
                    }
                >
                    {showPassword ? (
                        <Eye className={styles.icon} />
                    ) : (
                        <EyeOff className={styles.icon} />
                    )}
                </button>
            </BaseInput>
        </div>
    );
}
