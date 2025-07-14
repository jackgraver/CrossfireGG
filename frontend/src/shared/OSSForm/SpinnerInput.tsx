import { FaSpinner } from "react-icons/fa";
import BaseInput from "./BaseInput";
import { useState } from "react";

import "./spinner.css";

type SpinnerInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
};

export default function SpinnerInput({
    value,
    onChange,
    error,
    disabled = false,
    placeholder = "",
}: SpinnerInputProps) {
    const [showFaceitLinkSpinner, setShowFaceitLinkSpinner] = useState(false);

    return (
        <div className="relative w-full">
            <BaseInput
                type={"text"}
                value={value}
                onChange={onChange}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
            >
                {showFaceitLinkSpinner && (
                    <FaSpinner
                        size={24}
                        className="spinner pointer-events-none absolute right-3 top-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
                    />
                )}
            </BaseInput>
        </div>
    );
}
