import { createFileRoute } from "@tanstack/react-router";
import { useMatchesByStage } from "./-queries/tournament.queries";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/",
)({
    component: StagePage,
});

function StagePage() {
    const { tournamentId, stageId } = Route.useParams();

    const { data: matchesData, isLoading: matchesLoading } = useMatchesByStage(
        Number(stageId),
    );

    const matches = matchesData?.matches || [];

    return (
        <div className="rounded-xl shadow-md">
            {/* <div className="p-4">
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
                        stageFormat={{ ID: 1, name: "Groups" }}
                        stageId={1}
                        matches={matches}
                    />
                )}
            </div> */}
        </div>
    );
}
