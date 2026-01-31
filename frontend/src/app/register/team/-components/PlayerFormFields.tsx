import { Checkbox, Select } from "@/shared/form";
import { cn } from "@/utils/cn";
import { Trash } from "lucide-react";

type PlayerFormFieldsProps = {
    form: any;
    namePrefix: string;
    labelPrefix: string;
    onRemove?: () => void;
};

export default function PlayerFormFields({
    form,
    namePrefix,
    labelPrefix,
    onRemove,
}: PlayerFormFieldsProps) {
    const inputClasses = (isInvalid: boolean) => `
        w-full rounded-md border p-2 bg-secondBg text-text-primary transition-colors
        ${isInvalid ? "border-red-500 focus:ring-red-500" : "border-border focus:border-orange-500 focus:ring-orange-500"}
        disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const renderField = (name: string, label: string, placeholder: string = "") => (
        <form.Field
            name={`${namePrefix}.${name}`}
            validators={{
                onChange: ({ value }: any) =>
                    value.length < 1 ? `${label} is required` : undefined,
                onMount: ({ value }: any) =>
                    value.length < 1 ? `${label} is required` : undefined,
            }}
            children={(field: any) => {
                const isInvalid =
                    field.state.meta.touchedErrors && field.state.meta.touchedErrors.length > 0;
                return (
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label
                                htmlFor={field.name}
                                className="font-medium text-textSecondary uppercase text-xs tracking-wider"
                            >
                                {label}
                            </label>
                            <input
                                id={field.name}
                                className={inputClasses(isInvalid)}
                                type={"text"}
                                value={field.state.value}
                                placeholder={placeholder}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                disabled={name === "playerName" ? true : false}
                                title={name === "playerName" ? "Cannot change player name" : ""}
                            />
                        </div>
                        <em
                            role="alert"
                            className={cn(
                                "text-sm font-medium pl-1 min-h-5",
                                field.state.meta.isValid ? "invisible" : "text-red-500 visible",
                            )}
                        >
                            {field.state.meta.errors.join(", ")}
                        </em>
                    </div>
                );
            }}
        />
    );

    return (
        <div className="flex items-start gap-4">
            <div className="flex flex-1 flex-row gap-4">
                {renderField("playerName", "Name")}
                {renderField("nationality", "Nationality", "American, Canadian, etc.")}
                {renderField("hltvLink", "HLTV")}
                {renderField("discordId", "Discord")}
            </div>
            <div className="flex h-[62px] items-center pt-5">
                {onRemove ? (
                    <button
                        className="group rounded-md p-2 transition-colors hover:bg-red-500/10"
                        onClick={onRemove}
                        type="button"
                        title="Remove player"
                    >
                        <Trash
                            size={18}
                            className="text-red-500 transition-colors group-hover:text-red-500"
                        />
                    </button>
                ) : (
                    <div className="w-[34px]" /> // Spacer to maintain alignment when Trash is missing
                )}
            </div>
        </div>
    );
}
