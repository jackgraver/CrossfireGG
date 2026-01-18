import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
    useTournamentById,
    useMatchesByStage,
    useStageStandings,
} from "./-queries/tournament.queries";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/bracket",
)({
    component: BracketPage,
});

function BracketPage() {
    const { tournamentId, stageId } = Route.useParams();

    const { data, isLoading, error } = useStageStandings(Number(stageId));

    if (error) {
        return <div>Error loading standings</div>;
    }

    if (isLoading) {
        return <div>Loading standings...</div>;
    }

    if (!data || data.groups.length === 0) {
        return <div>No matches found for this stage</div>;
    }

    console.log(data);

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="p-4">
                <TopLevelBracket
                    stageFormat={data.stageFormat}
                    stageId={data?.id}
                    matches={data.groups.flatMap((group) => group.matches)}
                />
            </div>
        </div>
    );
}
