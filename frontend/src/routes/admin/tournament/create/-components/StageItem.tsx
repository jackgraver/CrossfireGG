import { Trash2 } from "lucide-react";
import { Input } from "@/components/shared/form/Input";
import { Checkbox, Select } from "@/components/shared/form";

type StageItemProps = {
    form: any;
    stage: any;
    index: number;
    stageFormats: any[] | undefined;
    onRemove: () => void;
};

export default function StageItem({
    form,
    stage,
    index,
    stageFormats,
    onRemove,
}: StageItemProps) {
    return (
        <div className="border-secondBg bg-secondBg/40 rounded-lg border p-4 pb-0">
            <div className="mb-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-semibold">
                        Stage {index + 1}
                        {stage?.name ? (
                            <span className="ml-2 font-normal text-gray-300">
                                — {stage.name}
                            </span>
                        ) : null}
                    </div>
                    <div className="text-xs text-gray-400">
                        Configure stage metadata.
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="group rounded-md p-2 transition-colors hover:bg-red-500/10"
                    title="Remove stage"
                    aria-label={`Remove stage ${index + 1}`}
                >
                    <Trash2
                        size={18}
                        className="text-red-500 transition-colors group-hover:text-red-500"
                    />
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <form.Field name={`stages[${index}].name`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Stage name"
                            placeholder="e.g. Group Stage"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].faceit_id`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="FACEIT championship link (optional)"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].max_teams`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Max teams"
                            type="number"
                            placeholder="e.g. 16"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].format_id`}>
                    {(field: any) => (
                        <Select
                            field={field}
                            options={
                                stageFormats?.map((format) => ({
                                    value: format.id.toString(),
                                    label: format.name,
                                })) ?? []
                            }
                            label="Format"
                            placeholder="Select a format"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].start_date`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Stage start"
                            type="date"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].end_date`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Stage end"
                            type="date"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].registration_deadline`}>
                    {(field: any) => (
                        <Input
                            name={field.name}
                            value={field.state.value ?? ""}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            label="Registration deadline"
                            type="date"
                        />
                    )}
                </form.Field>
                <form.Field name={`stages[${index}].is_entry_stage`}>
                    {(field: any) => (
                        <Checkbox
                            field={field}
                            topLabel="Entry Stage"
                            label="Set as entry stage"
                            disabled={false}
                        />
                    )}
                </form.Field>
            </div>
        </div>
    );
}
