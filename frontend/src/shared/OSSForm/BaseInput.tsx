import React from "react";

type BaseInputProps = {
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
    children?: React.ReactNode;
};

export default function BaseInput({
    type = "text",
    placeholder = "",
    value,
    onChange,
    disabled = false,
    error,
    children,
}: BaseInputProps) {
    return (
        <div className="w-full">
            <div className="relative">
                <div className="min-h-[1.25rem] font-sans text-xs font-medium text-red-500 antialiased">
                    {error && <span>{error}</span>}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full rounded-md border bg-secondBg px-4 py-2 hover:border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error ? "border-red-500" : "border-border"
                    }`}
                />
                {children}
            </div>
        </div>
    );
}
