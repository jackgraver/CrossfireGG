import type { AnyFieldApi } from "@tanstack/react-form";
import * as RadixSelect from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import { ChevronDown, Check } from "lucide-react";
import styles from "./Select.module.css";
import { cn } from "@/utils/cn";

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
    className?: string;
};

export function Select({
    field,
    options,
    placeholder = "Select...",
    label,
    disabled,
    className,
}: SelectProps) {
    const { isTouched, errors } = field.state.meta;
    const isInvalid = isTouched && errors.length > 0 ? String(errors[0]) : undefined;

    const firstError = isTouched && errors.length > 0 ? String(errors[0]) : undefined;
    const extraErrors = isTouched && errors.length > 1 ? errors.slice(1).join(", ") : undefined;

    return (
        <div className={cn(styles.wrapper, "flex flex-1 flex-col", className)}>
            <div className="flex flex-col gap-1.5">
                {label && (
                    <Label.Root
                        htmlFor={field.name}
                        className={cn(
                            styles.label,
                            "pl-1 text-xs font-medium tracking-wider text-gray-400 uppercase",
                        )}
                    >
                        {label}
                    </Label.Root>
                )}
                <div className={cn(styles.inputContainer, "relative w-full")}>
                    <RadixSelect.Root
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        disabled={disabled}
                    >
                        <RadixSelect.Trigger
                            id={field.name}
                            className={cn(
                                styles.trigger,
                                "border-firstBg w-full rounded-md border p-2 text-white transition-colors",
                                isInvalid
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:border-orange-500 focus:ring-orange-500",
                                "disabled:cursor-not-allowed disabled:border-none disabled:opacity-50",
                            )}
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
                                            <RadixSelect.ItemText>
                                                {option.label}
                                            </RadixSelect.ItemText>
                                            <RadixSelect.ItemIndicator
                                                className={styles.itemIndicator}
                                            >
                                                <Check />
                                            </RadixSelect.ItemIndicator>
                                        </RadixSelect.Item>
                                    ))}
                                </RadixSelect.Viewport>
                            </RadixSelect.Content>
                        </RadixSelect.Portal>
                    </RadixSelect.Root>
                </div>
            </div>
            <em
                role="alert"
                className={cn(
                    styles.errorText,
                    "mt-[0.5px] min-h-5 text-sm font-medium",
                    isInvalid ? "visible text-red-500" : "invisible",
                )}
            >
                {firstError}
                {extraErrors && (
                    <span title={extraErrors}> {"+" + (errors && errors.length - 1)}</span>
                )}
            </em>
        </div>
    );
}
