import { useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import * as Label from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordInput.module.css";

type PasswordInputProps = {
    field: AnyFieldApi;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
};

export function PasswordInput({
    field,
    placeholder = "Password",
    label,
    disabled,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { isTouched, errors } = field.state.meta;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;
    const wrapperClass = [styles.wrapper, error && styles.hasError]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapperClass}>
            {label && (
                <Label.Root htmlFor={field.name} className={styles.label}>
                    {label}
                </Label.Root>
            )}
            <div className={styles.errorText}>{error && <span>{error}</span>}</div>
            <div className={styles.inputContainer}>
                <input
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={disabled}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={disabled}
                    className={styles.toggleButton}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <Eye className={styles.icon} />
                    ) : (
                        <EyeOff className={styles.icon} />
                    )}
                </button>
            </div>
        </div>
    );
}
