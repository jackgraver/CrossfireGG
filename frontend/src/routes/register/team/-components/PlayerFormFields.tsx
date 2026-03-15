import { Input } from "@/components/shared/form";
import { Trash } from "lucide-react";

type PlayerFormFieldsProps = {
    form: any;
    namePrefix: string;
    labelPrefix: string;
    onRemove?: () => void;
};

type FieldWrapperProps = {
    form: any;
    namePrefix: string;
    name: string;
    label: string;
    placeholder?: string;
};

function FieldWrapper({
    form,
    namePrefix,
    name,
    label,
    placeholder = "",
}: FieldWrapperProps) {
    return (
        <form.Field
            name={`${namePrefix}.${name}`}
            validators={{
                onChange: ({ value }: any) =>
                    !value ? `${label} is required` : undefined,
                onMount: ({ value }: any) =>
                    !value ? `${label} is required` : undefined,
            }}
        >
            {(field: any) => (
                <Input
                    name={field.name}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    errors={field.state.meta.errors}
                    label={label}
                    placeholder={placeholder}
                    disabled={name === "playerName"}
                    title={
                        name === "playerName" ? "Cannot change player name" : ""
                    }
                />
            )}
        </form.Field>
    );
}

export default function PlayerFormFields({
    form,
    namePrefix,
    onRemove,
}: PlayerFormFieldsProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex flex-1 flex-row gap-4">
                <FieldWrapper
                    form={form}
                    namePrefix={namePrefix}
                    name="playerName"
                    label="Name"
                />
                <FieldWrapper
                    form={form}
                    namePrefix={namePrefix}
                    name="nationality"
                    label="Nationality"
                    placeholder="American, Canadian, etc."
                />
                <FieldWrapper
                    form={form}
                    namePrefix={namePrefix}
                    name="hltvLink"
                    label="HLTV"
                />
                <FieldWrapper
                    form={form}
                    namePrefix={namePrefix}
                    name="discordId"
                    label="Discord"
                />
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
