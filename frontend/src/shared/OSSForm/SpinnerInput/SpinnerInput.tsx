import BaseInput from "../BaseInput/BaseInput";
import { useState } from "react";

import styles from "./SpinnerInput.module.css";
import { Loader } from "lucide-react";

type SpinnerInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    loading?: boolean; // NEW
};

export default function SpinnerInput({
    value,
    onChange,
    error,
    disabled = false,
    placeholder = "",
    loading = false,
}: SpinnerInputProps) {
    return (
        <div className={styles.container}>
            <BaseInput
                type="text"
                value={value}
                onChange={onChange}
                error={error}
                disabled={disabled}
                placeholder={placeholder}
            >
                {loading && <Loader className={styles.icon} />}
            </BaseInput>
        </div>
    );
}
