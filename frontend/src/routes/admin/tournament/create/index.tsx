import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useTournamentForEdit } from "@/lib/api/tournament.queries";
import { toastService } from "@/components/shared/toast/toastService";
import { z } from "zod";
import TournamentFormPage from "./-components/TournamentFormPage";

const tournamentSearchSchema = z.object({
    tournamentId: z.string().optional(),
});

export const Route = createFileRoute("/admin/tournament/create/")({
    validateSearch: tournamentSearchSchema,
    component: RouteComponent,
});

function RouteComponent() {
    const { tournamentId } = Route.useSearch();
    const {
        data: editData,
        isLoading: isLoadingEdit,
        isError: isEditError,
    } = useTournamentForEdit(tournamentId);

    if (tournamentId && isLoadingEdit) {
        return (
            <div className="bg-mainBg text-textPrimary flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (tournamentId && isEditError) {
        toastService.error("Load failed", "Could not load tournament data");
    }

    return (
        <TournamentFormPage
            tournamentId={tournamentId}
            initialData={editData}
        />
    );
}
