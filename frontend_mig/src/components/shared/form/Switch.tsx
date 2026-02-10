import type { AnyFieldApi } from "@tanstack/react-form";
import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

type SwitchProps = {
    field: AnyFieldApi;
    label?: React.ReactNode;
    disabled?: boolean;
};

export function Switch({ field, label, disabled }: SwitchProps) {
    const { isTouched, errors } = field.state.meta;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <RadixSwitch.Root
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked)}
                    onBlur={field.handleBlur}
                    disabled={disabled}
                    className={styles.switch}
                >
                    <RadixSwitch.Thumb className={styles.thumb} />
                </RadixSwitch.Root>
                {label && (
                    <label htmlFor={field.name} className={styles.label}>
                        {label}
                    </label>
                )}
            </div>
            {error && <div className={styles.errorText}>{error}</div>}
        </div>
    );
}
