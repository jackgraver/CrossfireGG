import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import type { ToastStatus } from "./toastService";

export type ToastProps = {
    title: string;
    body?: React.ReactNode;
    onClose: () => void;
    status?: ToastStatus;
};

const statusConfig: Record<ToastStatus, { bg: string; accent: string; icon: React.ReactNode }> = {
    success: {
        bg: "bg-secondBg border-emerald-500/30",
        accent: "text-emerald-400",
        icon: <CheckCircle size={16} />,
    },
    error: {
        bg: "bg-secondBg border-red-500/30",
        accent: "text-red-400",
        icon: <AlertCircle size={16} />,
    },
    info: {
        bg: "bg-secondBg border-blue-500/30",
        accent: "text-blue-400",
        icon: <Info size={16} />,
    },
    default: {
        bg: "bg-neutral-900 border-neutral-700/50",
        accent: "text-neutral-300",
        icon: null,
    },
};

export default function Toast({ title, body, onClose, status = "default" }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const config = statusConfig[status];
    const hasBody = body !== "" && body != null;

    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    function handleClose() {
        setVisible(false);
        setTimeout(onClose, 200);
    }

    return (
        <div
            className={`${config.bg} w-full rounded-lg border shadow-lg shadow-black/30 transition-all duration-300 ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            role="status"
            aria-live="polite"
        >
            <div
                className={`flex gap-3 px-4 ${hasBody ? "items-start py-3" : "items-center py-2"}`}
            >
                {config.icon && (
                    <span
                        className={`${hasBody ? "mt-0.5" : ""} shrink-0 ${config.accent} flex items-center`}
                    >
                        {config.icon}
                    </span>
                )}
                <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug font-medium text-white">{title}</p>
                    {hasBody && (
                        <p className="mt-0.5 text-[13px] leading-relaxed text-neutral-400">
                            {body}
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleClose}
                    className={`${hasBody ? "mt-0.5" : ""} relative flex shrink-0 cursor-pointer items-center rounded p-1 text-neutral-500 transition-colors hover:bg-white/10 hover:text-neutral-300`}
                    aria-label="Close"
                    style={{}}
                >
                    <span
                        className="absolute inset-[-6px] rounded"
                        style={{
                            pointerEvents: "none",
                        }}
                    />
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
