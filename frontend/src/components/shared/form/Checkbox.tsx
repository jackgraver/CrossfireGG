import type { AnyFieldApi } from "@tanstack/react-form";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
    field: AnyFieldApi;
    label: React.ReactNode;
    topLabel?: string;
    disabled?: boolean;
};

export function Checkbox({ field, label, topLabel, disabled }: CheckboxProps) {
    const { isTouched, errors } = field.state.meta;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;

    return (
        <div className={styles.wrapper}>
            <span className={styles.topLabel}>{topLabel ?? "\u00A0"}</span>
            <label
                htmlFor={field.name}
                className={`${styles.container}${disabled ? ` ${styles.containerDisabled}` : ""}`}
            >
                <RadixCheckbox.Root
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                    onBlur={field.handleBlur}
                    disabled={disabled}
                    className={styles.checkbox}
                >
                    <RadixCheckbox.Indicator className={styles.indicator}>
                        <Check className={styles.checkIcon} />
                    </RadixCheckbox.Indicator>
                </RadixCheckbox.Root>
                <span className={styles.label}>{label}</span>
            </label>
            <em
                role="alert"
                className={styles.errorText}
                style={{ visibility: error ? "visible" : "hidden" }}
            >
                {error ?? "\u00A0"}
            </em>
        </div>
    );
}
