import { Input } from "@/components/shared/form";
import { Trash } from "lucide-react";

type PlayerFormFieldsProps = {
    form: any;
    namePrefix: string;
    labelPrefix: string;
    onRemove?: () => void;
};

export default function PlayerFormFields({ form, namePrefix, onRemove }: PlayerFormFieldsProps) {
    const renderField = (name: string, label: string, placeholder: string = "") => (
        <form.Field
            name={`${namePrefix}.${name}`}
            validators={{
                onChange: ({ value }: any) => (!value ? `${label} is required` : undefined),
                onMount: ({ value }: any) => (!value ? `${label} is required` : undefined),
            }}
            children={(field: any) => (
                <Input
                    name={field.name}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    errors={field.state.meta.errors}
                    label={label}
                    placeholder={placeholder}
                    disabled={name === "playerName"}
                    title={name === "playerName" ? "Cannot change player name" : ""}
                />
            )}
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
