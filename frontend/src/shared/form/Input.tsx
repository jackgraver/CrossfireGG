import * as Label from "@radix-ui/react-label";
import styles from "./Input.module.css";
import { cn } from "@/utils/cn";

type InputProps = {
    name: string;
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    errors?: string[];
    type?: "text" | "email" | "url" | "number";
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    inputClassName?: string;
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
    inputClassName,
    title,
}: InputProps) {
    const isInvalid =  errors && errors.length > 0 ? String(errors[0]) : undefined;

    const firstError = errors && errors.length > 0 ? String(errors[0]) : undefined;
    const extraErrors = errors && errors.length > 1 ? errors.slice(1).join(", ") : undefined;

    return (
        <div className={cn(styles.wrapper, "flex flex-1 flex-col", className)}>
            <div className="flex flex-col gap-1.5">
                {label && (
                    <Label.Root
                        htmlFor={name}
                        className={cn(
                            styles.label,
                            "text-xs font-medium text-gray-400 uppercase tracking-wider",
                        )}
                    >
                        {label}
                    </Label.Root>
                )}
                <div className={cn(styles.inputContainer, "relative w-full")}>
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
                            "w-full rounded-md border p-2 bg-thirdBg text-white transition-colors",
                            isInvalid
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-400 focus:border-orange-500 focus:ring-orange-500",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            inputClassName,
                        )}
                    />
                    {children}
                </div>
            </div>
            <em
                role="alert"
                className={cn(
                    styles.errorText,
                    "text-sm font-medium min-h-5",
                    isInvalid ? "text-red-500 visible" : "invisible",
                )}
            >
                {firstError}
                {extraErrors && <span title={extraErrors}> {"+" + (errors && errors.length - 1)}</span>}
            </em>
        </div>
    );
}
