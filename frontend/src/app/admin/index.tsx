import { createFileRoute } from "@tanstack/react-router";
import { useCreateTournamentForm } from "./-hooks/useCreateTournamentForm";
import { Plus, SaveIcon, Trash2 } from "lucide-react";
import { useStore } from "@tanstack/react-form";

export const Route = createFileRoute("/admin/")({
    component: Admin,
});

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

function FieldInput({
    field,
    label,
    type = "text",
    placeholder,
    className,
}: {
    field: any;
    label: string;
    type?: string;
    placeholder?: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-gray-200">
                {label}
            </label>
            <input
                id={field.name}
                type={type}
                placeholder={placeholder}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="w-full rounded-md border border-secondBg bg-secondBg px-3 py-2 text-textPrimary outline-none focus:ring-2"
            />
        </div>
    );
}

function FieldTextarea({
    field,
    label,
    placeholder,
}: {
    field: any;
    label: string;
    placeholder?: string;
}) {
    return (
        <div>
            <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-gray-200">
                {label}
            </label>
            <textarea
                id={field.name}
                placeholder={placeholder}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                rows={4}
                className="w-full resize-y rounded-md border border-secondBg bg-secondBg px-3 py-2 text-textPrimary outline-none focus:ring-2 "
            />
        </div>
    );
}

function Admin() {
    const { form } = useCreateTournamentForm();
    const stages = useStore(form.store, (state: any) => state.values.stages) ?? [];
    const prizePool = useStore(form.store, (state: any) => state.values.prize_pool);

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
        <div className="min-h-screen bg-mainBg p-6 text-textPrimary sm:p-8">
            <div className="mx-auto w-full max-w-6xl space-y-6">
                <header className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Admin Configuration</h1>
                    <p className="text-sm text-gray-400">
                        Basic tournament setup (no validation/submission yet).
                    </p>
                </header>
                <form
                    // onSubmit={(e) => {
                    //     e.preventDefault();
                    //     form.handleSubmit();
                    //     console.log("form meta", form.state);
                    // }}
                    className="grid gap-6 lg:grid-cols-2"
                >
                    <section className="rounded-lg border border-secondBg bg-firstBg p-6 shadow-lg">
                        <div className="flex items-center justify-between gap-4">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Tournament details</h2>
                                <p className="text-sm text-gray-400">
                                    Fill out the basics for the tournament.
                                </p>
                            </div>
                            <button
                                // type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit();
                                }}
                                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
                            >
                                <SaveIcon className="h-4 w-4" />
                                Create tournament
                            </button>
                        </div>
                        <div className="grid gap-4">
                            <form.Field name="name">
                                {(field: any) => (
                                    <FieldInput
                                        field={field}
                                        label="Tournament name"
                                        placeholder="e.g. Crossfire Season 4"
                                    />
                                )}
                            </form.Field>
                            <form.Field name="description">
                                {(field: any) => (
                                    <FieldTextarea
                                        field={field}
                                        label="Description"
                                        placeholder="Short description shown on the site."
                                    />
                                )}
                            </form.Field>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <form.Field name="prize_pool">
                                    {(field: any) => (
                                        <FieldInput
                                            field={field}
                                            label="Prize pool"
                                            placeholder="e.g. 1000"
                                            type="number"
                                        />
                                    )}
                                </form.Field>
                                <div className="   ">
                                    <div className="mb-1 block text-sm font-medium text-gray-200">
                                        Preview
                                    </div>
                                    <div className=" w-full rounded-md border border-secondBg text-sm bg-secondBg text-textPrimary  px-3 py-2">
                                        {prizePool ? `$${prizePool}` : "—"}
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <form.Field name="start_date">
                                    {(field: any) => (
                                        <FieldInput field={field} label="Start date" type="date" />
                                    )}
                                </form.Field>
                                <form.Field name="end_date">
                                    {(field: any) => (
                                        <FieldInput field={field} label="End date" type="date" />
                                    )}
                                </form.Field>
                            </div>
                        </div>
                    </section>
                    <section className="rounded-lg border border-secondBg bg-firstBg p-6 shadow-lg">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold">Stages</h2>
                                <p className="text-sm text-gray-400">
                                    Add one or more stages (registration, groups, playoffs, etc).
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
                            <div className="mt-4 flex min-h-[140px] items-center justify-center rounded-lg border border-dashed border-secondBg bg-secondBg/30 text-sm text-gray-400">
                                No stages yet. Click “Add stage” to create one.
                            </div>
                        ) : (
                            <div className="mt-4 space-y-4 overflow-y-auto ">
                                {stages.map((stage: any, index: number) => (
                                    <div
                                        key={stage?.__id ?? index}
                                        className="rounded-lg border border-secondBg bg-secondBg/40 p-4"
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
                                                    Configure stage metadata (local only for now).
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeStage(stage.__id)}
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
                                                    <FieldInput
                                                        field={field}
                                                        label="Stage name"
                                                        placeholder="e.g. Group Stage"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].faceitId`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="FACEIT stage/tournament ID"
                                                        placeholder="Optional"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].faceitLink`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="FACEIT championship link"
                                                        placeholder="https://www.faceit.com/en/championship/<id>"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].max_teams`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="Max teams"
                                                        type="number"
                                                        placeholder="e.g. 16"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].format_id`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="Format ID"
                                                        type="number"
                                                        placeholder="Optional"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].start_date`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="Stage start"
                                                        type="date"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].end_date`}>
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="Stage end"
                                                        type="date"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field
                                                name={`stages[${index}].registration_deadline`}
                                            >
                                                {(field: any) => (
                                                    <FieldInput
                                                        field={field}
                                                        label="Registration deadline"
                                                        type="date"
                                                        className="md:col-span-2"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`stages[${index}].is_current`}>
                                                {(field: any) => (
                                                    <div className="md:col-span-2">
                                                        <label className="mb-1 block text-sm font-medium text-gray-200">
                                                            Current stage
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                field.handleChange(
                                                                    !field.state.value,
                                                                )
                                                            }
                                                            className={[
                                                                "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
                                                                field.state.value
                                                                    ? "border-green-700/60 bg-green-900/20 text-green-200"
                                                                    : "border-secondBg bg-secondBg text-gray-200",
                                                            ].join(" ")}
                                                        >
                                                            <span
                                                                className={[
                                                                    "h-2.5 w-2.5 rounded-full",
                                                                    field.state.value
                                                                        ? "bg-green-400"
                                                                        : "bg-gray-500",
                                                                ].join(" ")}
                                                            />
                                                            {field.state.value
                                                                ? "Yes (current)"
                                                                : "No"}
                                                        </button>
                                                    </div>
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
