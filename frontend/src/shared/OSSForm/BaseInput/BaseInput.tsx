import styles from "./BaseInput.module.css";

type BaseInputProps = {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
    success?: (value: string) => boolean;
    children?: React.ReactNode;
    style?: string;
    autoFocus?: boolean;
};

export default function BaseInput({
    type = "text",
    placeholder = "",
    value,
    onChange,
    onBlur,
    disabled = false,
    error,
    success,
    children,
    style = "",
    autoFocus = false,
}: BaseInputProps) {
    const showSuccess = success && value ? success(value) : false;

    const wrapperClass = [
        styles.inputWrapper,
        error ? styles.hasError : showSuccess ? styles.hasSuccess : "",
    ].join(" ");

    return (
        <div className={wrapperClass}>
            <div className={styles.errorText}>
                {error && <span>{error}</span>}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                {...(type !== "file" ? { value } : {})}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={styles.inputElement + " " + style}
                autoFocus={autoFocus}
            />
            {children}
        </div>
    );
}
