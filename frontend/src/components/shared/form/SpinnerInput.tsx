import type { AnyFieldApi } from "@tanstack/react-form";
import * as Label from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import styles from "./SpinnerInput.module.css";

type SpinnerInputProps = {
    field: AnyFieldApi;
    type?: "text" | "url";
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    isValidating?: boolean;
};

export function SpinnerInput({
    field,
    type = "text",
    placeholder,
    label,
    disabled,
    isValidating,
}: SpinnerInputProps) {
    const { isTouched, errors, isValidating: fieldValidating } = field.state.meta;
    const showSpinner = isValidating || fieldValidating;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;
    const wrapperClass = [styles.wrapper, error && styles.hasError].filter(Boolean).join(" ");

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
                    type={type}
                    placeholder={placeholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={disabled}
                    className={styles.input}
                />
                {showSpinner && <Loader className={styles.spinner} />}
            </div>
        </div>
    );
}
