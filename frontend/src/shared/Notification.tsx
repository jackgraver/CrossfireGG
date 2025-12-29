import { useEffect, useState } from "react";
import CloseButton from "./buttons/CloseButton";

type NotificationProps = {
    title?: string;
    message: string;
    error: boolean;
    onClose: () => void;
};

export default function Notification({
    title,
    message,
    error,
    onClose,
}: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed right-4 bottom-4 rounded-lg px-4 py-3 text-black shadow-lg ${
                error ? "bg-red-500" : "bg-green-500"
            }`}
        >
            <div className="flex items-start justify-between gap-4 text-white">
                <div className="flex-1">
                    {title && (
                        <div className="mb-1 text-xl font-semibold">
                            {title}
                        </div>
                    )}
                    <div className="text-base">{message}</div>
                </div>
                <CloseButton onClose={onClose} />
            </div>
        </div>
    );
}
