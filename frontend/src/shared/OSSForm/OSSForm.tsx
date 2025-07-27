import { useState } from "react";
import { Loader, Check } from "lucide-react";
import styles from "./OSSForm.module.css"; // update path if needed

export default function OSSForm({
    children,
    onSubmit,
    onCancel,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
}: {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>; // return true if success, false if error
    onCancel?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
}) {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitStatus === "submitting") return;

        setSubmitStatus("submitting");

        try {
            const result = await onSubmit(e);
            console.log(result);
            if (result) {
                setSubmitStatus("success");
                setTimeout(() => {
                    setSubmitStatus("idle");
                }, 500);
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {children}
            <div className="mt-6 flex flex-row gap-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded bg-border px-4 py-2 text-textSecondary hover:bg-secondBg"
                    >
                        {cancelLabel}
                    </button>
                )}
                <button
                    type="submit"
                    className={`flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-textPrimary ${
                        onCancel ? "flex-1" : "w-full"
                    } ${
                        submitStatus === "submitting"
                            ? "bg-secondBg"
                            : "hover:bg-blue-600 focus:bg-blue-600"
                    }`}
                    disabled={submitStatus === "submitting"}
                >
                    {submitStatus === "idle" && submitLabel}
                    {submitStatus === "submitting" && (
                        <Loader className={styles.icon} />
                    )}
                    {submitStatus === "success" && (
                        <Check className={styles.icon} />
                    )}
                    {submitStatus === "error" && submitLabel}
                </button>
            </div>
        </form>
    );
}
