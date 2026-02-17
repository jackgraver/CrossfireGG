import { createFileRoute } from "@tanstack/react-router";
import { useCreateTournamentForm } from "./-hooks/useCreateTournamentForm";
import { Check, Plus, SaveIcon, Trash2 } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import { Input } from "@/components/shared/form/Input";
import { Checkbox, Select } from "@/components/shared/form";
import { useAllStageFormats } from "../../../../lib/api/manage_tournaments.queries";

const createStage = () => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const today = new Date().toISOString().slice(0, 10);

    return {
        __id: id,
        name: "",
        faceit_id: "",
        faceitLink: "",
        max_teams: "",
        format_id: "",
        is_current: false,
        start_date: today,
        end_date: today,
        registration_deadline: today,
    };
};

export const Route = createFileRoute("/admin/tournament/create/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { form } = useCreateTournamentForm();

    const { data: stageFormats } = useAllStageFormats();

    const stages =
        useStore(form.store, (state: any) => state.values.stages) ?? [];

    const addStage = () => {
        form.setFieldValue("stages", [...stages, createStage()]);
    };

    const removeStage = (stageId: string) => {
        form.setFieldValue(
            "stages",
            stages.filter((s: any) => s?.__id !== stageId),
        );
    };

    return (
        <div className="bg-mainBg text-textPrimary min-h-screen py-6">
            <div className="mx-auto w-full space-y-6">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Admin Configuration</h1>
                    <p className="text-sm text-gray-400">
                        Basic tournament setup (no validation/submission yet).
                    </p>
                </header>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                        console.log("form meta", form.state);
                    }}
                    className="grid gap-6 lg:grid-cols-2"
                >
                    <section className="border-secondBg bg-firstBg max-h-[575px] rounded-lg border p-6 shadow-lg">
                        <div className="flex items-center justify-between gap-4">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">
                                    Tournament details
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Fill out the basics for the tournament.
                                </p>
                            </div>
                            <button
                                onClick={async (e) => {
                                    e.preventDefault();
                                    console.log(form.state.values);
                                    form.handleSubmit();
                                }}
                                disabled={
                                    form.state.errors.length > 0 ||
                                    ((form.state.isSubmitting ||
                                        stages.length === 0) &&
                                        stages.forEach(
                                            (stage: any) => stage.name === "",
                                        ))
                                }
                                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
                                title={
                                    stages.length === 0
                                        ? "At least one stage is required"
                                        : ""
                                }
                            >
                                <SaveIcon className="h-4 w-4" />
                                Create tournament
                            </button>
                        </div>
                        <div className="grid gap-2">
                            <form.Field name="name">
                                {(field: any) => (
                                    <Input
                                        name={field.name}
                                        value={field.state.value ?? ""}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                        label="Tournament name"
                                        placeholder="e.g. Crossfire Season 4"
                                    />
                                )}
                            </form.Field>
                            <form.Field name="description">
                                {(field: any) => (
                                    <Input
                                        type="textarea"
                                        name={field.name}
                                        value={field.state.value ?? ""}
                                        onChange={field.handleChange}
                                        onBlur={field.handleBlur}
                                        label="Description"
                                        placeholder="Short description shown on the site."
                                    />
                                )}
                            </form.Field>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <form.Field name="prize_pool">
                                    {(field: any) => (
                                        <Input
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                            label="Prize pool"
                                            placeholder="e.g. 1000"
                                            type="number"
                                        />
                                    )}
                                </form.Field>
                                <form.Field name="is_vrs_enabled">
                                    {(field: any) => (
                                        <Checkbox
                                            field={field}
                                            label="Is VRS Enabled"
                                            disabled={false}
                                        />
                                    )}
                                </form.Field>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <form.Field name="start_date">
                                    {(field: any) => (
                                        <Input
                                            name={field.name}
                                            value={field.state.value ?? ""}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                            label="Start date"
                                            type="date"
                                        />
                                    )}
                                </form.Field>
                                <form.Field name="end_date">
                                    {(field: any) => (
                                        <>
                                            <Input
                                                name={field.name}
                                                value={field.state.value ?? ""}
                                                onChange={field.handleChange}
                                                onBlur={field.handleBlur}
                                                label="End date"
                                                type="date"
                                            />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>
                    </section>
                    <section className="border-secondBg bg-firstBg rounded-lg border p-6 shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Stages
                                </h2>
                                <p className="text-sm text-gray-400">
                                    Add one or more stages
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addStage}
                                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                            >
                                <Plus className="h-4 w-4" />
                                Add stage
                            </button>
                        </div>
                        {stages.length === 0 ? (
                            <div className="border-secondBg bg-secondBg/30 mt-4 flex min-h-[140px] items-center justify-center rounded-lg border border-dashed text-sm text-gray-400">
                                No stages yet.
                            </div>
                        ) : (
                            <div className="mt-4 space-y-4">
                                {stages.map((stage: any, index: number) => (
                                    <div
                                        key={stage?.__id ?? index}
                                        className="border-secondBg bg-secondBg/40 rounded-lg border p-4 pb-0"
                                    >
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
                                                onClick={() =>
                                                    removeStage(stage.__id)
                                                }
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
                                            <form.Field
                                                name={`stages[${index}].name`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="Stage name"
                                                        placeholder="e.g. Group Stage"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].faceit_id`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="FACEIT championship link"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].max_teams`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="Max teams"
                                                        type="number"
                                                        placeholder="e.g. 16"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].format_id`}
                                            >
                                                {(field: any) => (
                                                    <Select
                                                        field={field}
                                                        options={
                                                            stageFormats?.map(
                                                                (format) => ({
                                                                    value: format.id.toString(),
                                                                    label: format.name,
                                                                }),
                                                            ) ?? []
                                                        }
                                                        label="Format"
                                                        placeholder="Select a format"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].start_date`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="Stage start"
                                                        type="date"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].end_date`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="Stage end"
                                                        type="date"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field
                                                name={`stages[${index}].registration_deadline`}
                                            >
                                                {(field: any) => (
                                                    <Input
                                                        name={field.name}
                                                        value={
                                                            field.state.value ??
                                                            ""
                                                        }
                                                        onChange={
                                                            field.handleChange
                                                        }
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        label="Registration deadline"
                                                        type="date"
                                                    />
                                                )}
                                            </form.Field>
                                            <form.Field name="is_vrs_enabled">
                                                {(field: any) => (
                                                    <Checkbox
                                                        field={field}
                                                        label="Is VRS Enabled"
                                                        disabled={false}
                                                    />
                                                )}
                                            </form.Field>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </form>
            </div>
        </div>
    );
}
