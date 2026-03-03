import type { AnyFieldApi } from "@tanstack/react-form";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
    field: AnyFieldApi;
    label: React.ReactNode;
    disabled?: boolean;
};

export function Checkbox({ field, label, disabled }: CheckboxProps) {
    const { isTouched, errors } = field.state.meta;
    const error =
        isTouched && errors.length > 0 ? String(errors[0]) : undefined;

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <RadixCheckbox.Root
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                    }
                    onBlur={field.handleBlur}
                    disabled={disabled}
                    className={styles.checkbox}
                >
                    <RadixCheckbox.Indicator className={styles.indicator}>
                        <Check className={styles.checkIcon} />
                    </RadixCheckbox.Indicator>
                </RadixCheckbox.Root>
                <label htmlFor={field.name} className={styles.label}>
                    {label}
                </label>
            </div>
            {error && <div className={styles.errorText}>{error}</div>}
        </div>
    );
}
