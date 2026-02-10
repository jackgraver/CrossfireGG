import { createFileRoute } from "@tanstack/react-router";
import { useStageBracket } from "../../../../../lib/api/tournament.queries";
import TopLevelBracket from "@/components/shared/bracket/TopLevelBracket";

export const Route = createFileRoute("/tournament/$tournamentId/stage/$stageId/bracket")({
    component: BracketPage,
});

function BracketPage() {
    const { tournamentId, stageId } = Route.useParams();

    const { data, isLoading, error } = useStageBracket(Number(stageId));
    console.log("data", data);

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
