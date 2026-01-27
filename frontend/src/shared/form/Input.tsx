import type { AnyFieldApi } from "@tanstack/react-form";
import * as Label from "@radix-ui/react-label";
import styles from "./Input.module.css";

type InputProps = {
    field: AnyFieldApi;
    type?: "text" | "email" | "url" | "number";
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
};

export function Input({
    field,
    type = "text",
    placeholder,
    label,
    disabled,
    children,
}: InputProps) {
    const { isTouched, errors } = field.state.meta;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;
    const wrapperClass = [styles.wrapper, error && styles.hasError].filter(Boolean).join(" ");

    return (
        <div className={wrapperClass}>
            {label && (
                <Label.Root htmlFor={field.name} className={styles.label}>
                    {label}
                </Label.Root>
            )}
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
                {children}
            </div>
            <div className={styles.errorText}>{error && <span>{error}</span>}</div>
        </div>
    );
}
