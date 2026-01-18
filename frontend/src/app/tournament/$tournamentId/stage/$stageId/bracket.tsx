import { createFileRoute } from "@tanstack/react-router";
import {
    useStageBracket,
} from "./-queries/tournament.queries";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/bracket",
)({
    component: BracketPage,
});

function BracketPage() {
    const { tournamentId, stageId } = Route.useParams();

    const { data, isLoading, error } = useStageBracket(Number(stageId));

    if (error) {
        return <div>Error loading standings</div>;
    }

    if (isLoading) {
        return <div>Loading standings...</div>;
    }

    if (!data || data.groups.length === 0) {
        return <div>No matches found for this stage</div>;
    }

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="p-4">
                <TopLevelBracket
                    stageFormat={data.format}
                    groups={data.groups}
                />
            </div>
        </div>
    );
}
