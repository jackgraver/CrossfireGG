import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTournament, useMatchesByStage } from "./-queries/tournamentQueries";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/bracket",
)({
    component: BracketPage,
});

function BracketPage() {
    const { tournamentId } = Route.useParams();
    const { data: tournament } = useTournament(tournamentId);
    const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

    const stages = tournament?.stages || []; //TODO: need to handle better, tournament needs > 1 stage

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
