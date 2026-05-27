import * as Label from "@radix-ui/react-label";
import styles from "./Input.module.css";
import { cn } from "@/utils/cn";

type InputProps = {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    errors?: string[];
    type?: "text" | "email" | "url" | "number" | "date" | "textarea";
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    title?: string;
};

export function Input({
    name,
    value,
    onChange,
    onBlur,
    errors,
    type = "text",
    placeholder,
    label,
    disabled,
    children,
    className,
    title,
}: InputProps) {
    const isInvalid = errors && errors.length > 0 ? String(errors[0]) : undefined;

    const firstError = errors && errors.length > 0 ? String(errors[0]) : undefined;
    const extraErrors = errors && errors.length > 1 ? errors.slice(1).join(", ") : undefined;

    return (
        <div className={cn(styles.wrapper, className)}>
            {label && (
                <Label.Root htmlFor={name} className={styles.label}>
                    {label}
                </Label.Root>
            )}
            <div className="relative w-full">
                {type === "textarea" ? (
                    <textarea
                        id={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        disabled={disabled}
                        title={title}
                        rows={4}
                        className={cn(
                            styles.input,
                            "border-firstBg w-full rounded-md border p-2 text-white transition-colors",
                            isInvalid
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-orange-500 focus:ring-orange-500",
                            "disabled:cursor-not-allowed disabled:border-none disabled:opacity-50",
                        )}
                    />
                ) : (
                    <input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        disabled={disabled}
                        title={title}
                        className={cn(
                            styles.input,
                            "border-firstBg w-full rounded-md border p-2 text-white transition-colors",
                            isInvalid
                                ? "border-red-500 focus:ring-red-500"
                                : "focus:border-orange-500 focus:ring-orange-500",
                            "disabled:cursor-not-allowed disabled:border-none disabled:opacity-50",
                        )}
                    />
                )}
                {children}
            </div>
            <em
                role="alert"
                className={styles.errorText}
                style={{ visibility: isInvalid ? "visible" : "hidden" }}
            >
                {firstError}
                {extraErrors && (
                    <span title={extraErrors}> {"+" + (errors && errors.length - 1)}</span>
                )}
            </em>
        </div>
    );
}
