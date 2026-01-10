import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
    useTournament,
    useMatchesByStage,
} from "../../../-queries/tournamentQueries";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";
import type { Stage } from "@/types/TournamentModel";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/bracket",
)({
    component: BracketPage,
});

function BracketPage() {
    const { tournament: tournamentId } = Route.useParams();
    const { data: tournament } = useTournament(tournamentId);
    const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

    const stages = tournament?.stages || [];

    useEffect(() => {
        if (stages.length > 0 && selectedStageId === null) {
            const currentStage = stages.find((s) => s.is_current) || stages[0];
            setSelectedStageId(currentStage.ID);
        }
    }, [stages, selectedStageId]);

    const selectedStage = stages.find((s) => s.ID === selectedStageId);

    const { data: matchesData, isLoading: matchesLoading } =
        useMatchesByStage(selectedStageId);

    const matches = matchesData?.matches || [];

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Bracket
                </h2>
                {stages.length > 0 && (
                    <select
                        value={selectedStageId ?? ""}
                        onChange={(e) =>
                            setSelectedStageId(Number(e.target.value))
                        }
                        className="border-border bg-secondBg text-textPrimary rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                        {stages.map((stage) => (
                            <option key={stage.ID} value={stage.ID}>
                                {stage.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="p-4">
                {matchesLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading bracket...
                    </div>
                ) : matches.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No matches found for this stage
                    </div>
                ) : (
                    <TopLevelBracket
                        stageFormat={selectedStage?.format}
                        stageId={selectedStageId}
                        matches={matches}
                    />
                )}
            </div>
        </div>
    );
}
