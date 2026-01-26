import type { AnyFieldApi } from "@tanstack/react-form";
import * as RadixSelect from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import { ChevronDown, Check } from "lucide-react";
import styles from "./Select.module.css";

type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    field: AnyFieldApi;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
};

export function Select({
    field,
    options,
    placeholder = "Select...",
    label,
    disabled,
}: SelectProps) {
    const { isTouched, errors } = field.state.meta;
    const error = isTouched && errors.length > 0 ? String(errors[0]) : undefined;
    const wrapperClass = [styles.wrapper, error && styles.hasError].filter(Boolean).join(" ");

    return (
        <div className={wrapperClass}>
            {label && (
                <Label.Root htmlFor={field.name} className={styles.label}>
                    {label}
                </Label.Root>
            )}
            <div className={styles.errorText}>{error && <span>{error}</span>}</div>
            <RadixSelect.Root
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                disabled={disabled}
            >
                <RadixSelect.Trigger
                    id={field.name}
                    className={styles.trigger}
                    onBlur={field.handleBlur}
                >
                    <RadixSelect.Value placeholder={placeholder} />
                    <RadixSelect.Icon className={styles.icon}>
                        <ChevronDown />
                    </RadixSelect.Icon>
                </RadixSelect.Trigger>
                <RadixSelect.Portal>
                    <RadixSelect.Content
                        className={styles.content}
                        position="popper"
                        sideOffset={4}
                    >
                        <RadixSelect.Viewport className={styles.viewport}>
                            {options.map((option) => (
                                <RadixSelect.Item
                                    key={option.value}
                                    value={option.value}
                                    className={styles.item}
                                >
                                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                                    <RadixSelect.ItemIndicator className={styles.itemIndicator}>
                                        <Check />
                                    </RadixSelect.ItemIndicator>
                                </RadixSelect.Item>
                            ))}
                        </RadixSelect.Viewport>
                    </RadixSelect.Content>
                </RadixSelect.Portal>
            </RadixSelect.Root>
        </div>
    );
}
