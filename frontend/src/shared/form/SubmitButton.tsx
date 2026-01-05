import { Loader, Check } from "lucide-react";
import styles from "./SubmitButton.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SubmitButtonProps = {
    status: SubmitStatus;
    label?: string;
    className?: string;
};

export function SubmitButton({
    status,
    label = "Submit",
    className = "",
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={status === "submitting"}
            className={`text-textPrimary flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 ${
                status === "submitting"
                    ? "bg-secondBg"
                    : "hover:bg-blue-600 focus:bg-blue-600"
            } ${className}`}
        >
            {status === "idle" && label}
            {status === "submitting" && (
                <Loader className={`${styles.icon} ${styles.spinner}`} />
            )}
            {status === "success" && (
                <Check className={`${styles.icon} ${styles.checkPop}`} />
            )}
            {status === "error" && "Error"}
        </button>
    );
}
