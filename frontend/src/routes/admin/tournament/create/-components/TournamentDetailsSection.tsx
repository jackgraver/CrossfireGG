import { SaveIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/shared/form/Input";
import { Checkbox } from "@/components/shared/form";

type TournamentDetailsSectionProps = {
    form: any;
    isEditMode: boolean;
    isSubmitting: boolean;
    hasStages: boolean;
};

export default function TournamentDetailsSection({
    form,
    isEditMode,
    isSubmitting,
    hasStages,
}: TournamentDetailsSectionProps) {
    return (
        <section className="border-secondBg bg-firstBg max-h-143.75 rounded-lg border p-6 shadow-lg">
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
                        form.handleSubmit();
                    }}
                    disabled={isSubmitting || !hasStages}
                    className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-600"
                    title={!hasStages ? "At least one stage is required" : ""}
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <SaveIcon className="h-4 w-4" />
                    )}
                    {isEditMode ? "Save changes" : "Create tournament"}
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
                                topLabel="VRS"
                                label="Is VRS Compliant"
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
                            <Input
                                name={field.name}
                                value={field.state.value ?? ""}
                                onChange={field.handleChange}
                                onBlur={field.handleBlur}
                                label="End date"
                                type="date"
                            />
                        )}
                    </form.Field>
                </div>
            </div>
        </section>
    );
}
