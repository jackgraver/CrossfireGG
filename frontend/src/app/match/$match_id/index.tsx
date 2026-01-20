import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useMatch } from "./-queries/matchQueries";
import MatchHeader from "./-components/MatchHeader";
import MapResults from "./-components/MapResults";
import TeamDisplay from "./-components/TeamDisplay";

export const Route = createFileRoute("/match/$match_id/")({
    component: MatchPage,
});

function MatchPage() {
    const navigate = useNavigate();
    const { match_id } = Route.useParams();
    const { data, isLoading, error } = useMatch(match_id);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-red-500">Error: {error.message}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-white">No data</div>
            </div>
        );
    }

    const { team1, team2, players1, players2, match, maps } = data;

    return (
        <div className="flex min-h-screen w-full flex-col items-center bg-black px-4 py-8 text-white">
            <MatchHeader team1={team1} team2={team2} match={match} />

            <div className="mt-8 flex w-full max-w-7xl flex-row gap-8">
                <div className="w-1/3">
                    <TeamDisplay team={team1} players={players1} />
                </div>

                <div className="flex w-[320px] flex-col items-center justify-start gap-6 pt-16">
                    <div className="flex flex-col gap-4 text-center">
                        <button
                            className="rounded bg-orange-500 px-6 py-2 text-sm font-bold"
                            onClick={() => {
                                if (match.faceit_url) {
                                    window.open(match.faceit_url, "_blank");
                                }
                            }}
                        >
                            VIEW FACEIT PAGE
                        </button>
                        {match.status === "FINISHED" && (
                            <button
                                className="rounded bg-blue-500 px-6 py-2 text-sm font-bold"
                                onClick={() =>
                                    navigate({
                                        to: `/match/${match.match_id}/stats`,
                                    })
                                }
                            >
                                MATCH STATS
                            </button>
                        )}
                    </div>
                    <MapResults maps={maps} />
                </div>

                <div className="w-1/3">
                    <TeamDisplay team={team2} players={players2} />
                </div>
            </div>
        </div>
    );
}
