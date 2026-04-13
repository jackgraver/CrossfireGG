import { createFileRoute } from "@tanstack/react-router";
import { useStageBracket, useTournamentById } from "@/lib/api/tournament.queries";
import TopLevelBracket from "@/components/shared/bracket/TopLevelBracket";

export const Route = createFileRoute("/tournament/$tournamentId/stage/$stageId/bracket")({
    component: BracketPage,
});

function BracketPage() {
    const { tournamentId, stageId } = Route.useParams();
    const { data: tournament } = useTournamentById(tournamentId);

    const { data, isLoading, error } = useStageBracket(stageId, {
        refetchInterval: tournament?.syncStatus === "processing" ? 3_000 : undefined,
    });

    if (error) {
        return <div>Error loading standings</div>;
    }

    if (isLoading) {
        return <div>Loading standings...</div>;
    }

    if (!data || data.groups.length === 0) {
        return <div>No matches found for this stage</div>;
    }

    return <TopLevelBracket stageFormat={data.format} groups={data.groups} />;
}
