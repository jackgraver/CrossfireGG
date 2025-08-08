"use client";

import React from "react";

/**
 * Visual status of a toast. Controls background/text color styles.
 * - default: neutral styling
 * - success: green
 * - error: red
 * - info: blue
 */
type ToastStatus = "default" | "success" | "error" | "info";
/** Placement variant for where the toast appears. */
type ToastVariant = "bottom-right" | "center";

/**
 * Props for the Toast component.
 * - title: Optional heading displayed above the body
 * - body: Toast content (text or JSX)
 * - onClose: Called when the close button is pressed
 * - status: Visual status (default/success/error/info)
 * - variant: Placement (bottom-right/center)
 * - className: Extra CSS classes to extend styling
 */
export type ToastProps = {
    title?: string;
    body: React.ReactNode;
    onClose: () => void;
    status?: ToastStatus;
    variant?: ToastVariant;
    className?: string;
};

/** Returns Tailwind classes based on toast status. */
function statusClasses(status: ToastStatus = "default"): string {
    switch (status) {
        case "success":
            return "bg-green-600 text-white";
        case "error":
            return "bg-red-600 text-white";
        case "info":
            return "bg-blue-600 text-white";
        default:
            return "bg-neutral-800 text-white";
    }
}

/** Returns positioning classes for the specified variant. */
function positionClasses(variant: ToastVariant = "bottom-right"): string {
    if (variant === "center") {
        return "fixed left-1/2 top-[25%] -translate-x-1/2";
    }
    return "fixed bottom-4 right-4";
}

/**
 * Base Toast component. Usually used via the convenience exports
 * `BottomRightToast` and `CenterToast`.
 */
export default function Toast({
    title,
    body,
    onClose,
    status = "default",
    variant = "bottom-right",
    className = "",
}: ToastProps) {
    return (
        <div
            className={`${positionClasses(variant)} z-50 max-w-sm rounded-lg shadow-lg ${statusClasses(status)} ${className}`}
            role="status"
            aria-live="polite"
        >
            <div className="flex items-start gap-3 p-4">
                <div className="flex-1">
                    {title && (
                        <h3 className="mb-1 text-lg font-semibold leading-snug">
                            {title}
                        </h3>
                    )}
                    <div className="text-sm leading-relaxed">{body}</div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-2 rounded p-1.5 transition-colors hover:bg-white/20"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

/** Convenience component for a bottom-right positioned toast. */
export function BottomRightToast(props: Omit<ToastProps, "variant">) {
    return <Toast {...props} variant="bottom-right" />;
}

/** Convenience component for a centered toast. */
export function CenterToast(props: Omit<ToastProps, "variant">) {
    return <Toast {...props} variant="center" />;
}
