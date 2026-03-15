import { useTournamentForm } from "../-hooks/useTournamentForm";
import { useStore } from "@tanstack/react-form";
import { useAllStageFormats } from "@/lib/api/manage_tournaments.queries";
import type { TournamentForEditDTO } from "@repo/contracts";
import TournamentDetailsSection from "./TournamentDetailsSection";
import StagesSection from "./StagesSection";

const createStage = () => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const today = new Date().toISOString().slice(0, 10);

    return {
        __id: id,
        name: "",
        faceit_id: "",
        max_teams: "",
        format_id: "",
        is_current: false,
        is_entry_stage: false,
        start_date: today,
        end_date: today,
        registration_deadline: today,
    };
};

type TournamentFormPageProps = {
    tournamentId?: string;
    initialData?: TournamentForEditDTO;
};

export default function TournamentFormPage({
    tournamentId,
    initialData,
}: TournamentFormPageProps) {
    const { form, isEditMode, isSubmitting } = useTournamentForm(
        tournamentId && initialData ? { tournamentId, initialData } : undefined,
    );

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
                    <h1 className="text-2xl font-bold">
                        {isEditMode ? "Edit Tournament" : "Create Tournament"}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {isEditMode
                            ? "Update the tournament configuration below."
                            : "Fill out the form to create a new tournament."}
                    </p>
                </header>
                <form
                    onSubmit={form.handleSubmit}
                    className="grid gap-6 lg:grid-cols-2"
                >
                    <TournamentDetailsSection
                        form={form}
                        isEditMode={isEditMode}
                        isSubmitting={isSubmitting}
                        hasStages={stages.length > 0}
                    />
                    <StagesSection
                        form={form}
                        stages={stages}
                        stageFormats={stageFormats}
                        addStage={addStage}
                        removeStage={removeStage}
                    />
                </form>
            </div>
        </div>
    );
}
