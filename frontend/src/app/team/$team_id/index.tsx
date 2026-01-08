import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BooleanStatus } from "@/types/TeamModel";
import { useTeam, useTeamMatchesByStage } from "../-queries/teamQueries";
import { formatDateOnly } from "@/lib/dateUtils";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { openInNewTab } from "@/lib/NewTab";
import TeamPlayerManagement from "./-components/TeamPlayerManagement";

function TeamNotFoundFallback({ message }: { message?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                <h1 className="text-textPrimary mb-4 text-3xl font-bold">
                    Team Not Found
                </h1>
                <p className="text-textSecondary mb-6 text-lg">
                    {message ||
                        "The team you're looking for doesn't exist or could not be loaded. Please check the URL and try again."}
                </p>
                <Link
                    to="/"
                    className="bg-secondBg hover:bg-thirdBg text-textPrimary inline-block rounded-lg px-6 py-3 font-semibold transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export const Route = createFileRoute("/team/$team_id/")({
    component: Team,
    // beforeLoad: async ({ params }) => {
    //     const { team_id } = params;
    //     const session = await fetchSession();

    //     if (
    //         !session ||
    //         !session.team_id ||
    //         session.team_id !== parseInt(team_id)
    //     ) {
    //         throw redirect({
    //             to: "/",
    //             replace: true,
    //         });
    //     }
    // },
});

function Team() {
    const { team_id } = Route.useParams();
    const session = Route.useRouteContext().session;
    const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

    if (!team_id) {
        return (
            <TeamNotFoundFallback message="The team ID is missing or invalid. Please check the URL and try again." />
        );
    }

    const { data, isLoading, error } = useTeam(team_id);

    useEffect(() => {
        if (
            data?.tournaments &&
            data.tournaments.length > 0 &&
            !selectedStageId
        ) {
            // Find the first available stage
            const firstTournament = data.tournaments[0];
            if (firstTournament.stages && firstTournament.stages.length > 0) {
                setSelectedStageId(firstTournament.stages[0].stage_id);
            }
        }
    }, [data, selectedStageId]);

    const { data: matches, isLoading: isLoadingMatches } =
        useTeamMatchesByStage(team_id, selectedStageId);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error) {
        return (
            <TeamNotFoundFallback message="Failed to load team information. The team may not exist or there was an error connecting to the server." />
        );
    }

    if (!data) {
        return <TeamNotFoundFallback />;
    }

    const { team, tournaments } = data;

    const canManagePlayers =
        session?.team_id && parseInt(team_id) === session.team_id;

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-5">
            <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
                <div className="flex items-center gap-5">
                    <TeamLogo
                        team={team}
                        styling="h-32 w-32 rounded-full border-4 border-border object-cover"
                    />
                    <div className="flex-1">
                        <div className="mb-4 flex flex-row items-center gap-x-2">
                            <h1 className="text-textPrimary text-3xl font-bold">
                                {team.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {tournaments.map((tournament) => (
                    <div
                        key={tournament.tournament_id}
                        className="bg-firstBg rounded-xl p-6 shadow-md"
                    >
                        <h2 className="text-textPrimary mb-4 text-xl font-bold">
                            {tournament.tournament_name}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {tournament.stages.map((stage) => (
                                <button
                                    key={stage.stage_id}
                                    onClick={() =>
                                        setSelectedStageId(stage.stage_id)
                                    }
                                    className={`flex flex-col rounded-lg border p-4 text-left transition-all ${
                                        selectedStageId === stage.stage_id
                                            ? "border-accent bg-accent/10 shadow-sm"
                                            : "border-border bg-secondBg hover:bg-thirdBg"
                                    }`}
                                >
                                    <span className="text-textPrimary font-semibold">
                                        {stage.stage_name}
                                    </span>
                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                        {stage.wins !== undefined &&
                                            stage.losses !== undefined && (
                                                <span className="text-textSecondary">
                                                    Record: {stage.wins}-
                                                    {stage.losses}
                                                </span>
                                            )}
                                        {stage.seed !== undefined && (
                                            <span className="text-textSecondary">
                                                Seed: {stage.seed}
                                            </span>
                                        )}
                                        {stage.paid !== undefined && (
                                            <span className="text-textSecondary">
                                                Paid:{" "}
                                                {stage.paid ===
                                                BooleanStatus.True
                                                    ? "Yes"
                                                    : "No"}
                                            </span>
                                        )}
                                        {stage.joined_tournament !==
                                            undefined && (
                                            <span className="text-textSecondary">
                                                Signed Up:{" "}
                                                {stage.joined_tournament ===
                                                BooleanStatus.True
                                                    ? "Yes"
                                                    : "No"}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {true && <TeamPlayerManagement team_id={team_id} team={team} />}
            <div className="bg-firstBg rounded-xl p-8 shadow-md">
                <h2 className="text-textPrimary mb-6 text-2xl font-bold">
                    {selectedStageId
                        ? `Matches - ${
                              tournaments
                                  .flatMap((t) => t.stages)
                                  .find((s) => s.stage_id === selectedStageId)
                                  ?.stage_name || "Stage"
                          }`
                        : "Match History"}
                </h2>

                {isLoadingMatches ? (
                    <div className="text-textSecondary py-10 text-center">
                        Loading matches...
                    </div>
                ) : matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches
                            .sort(
                                (a, b) =>
                                    (b.scheduled_at ?? 0) -
                                    (a.scheduled_at ?? 0),
                            )
                            .map((match) => {
                                const getMatchResult = ():
                                    | "Scheduled"
                                    | "W"
                                    | "L"
                                    | "-" => {
                                    if (match.status !== "FINISHED")
                                        return "Scheduled";
                                    return "-";
                                };

                                const getMatchScore = () => {
                                    if (match.status !== "FINISHED")
                                        return "vs";
                                    return "vs";
                                };

                                const getOpponent = () => {
                                    const isTeam1 =
                                        match.participants?.team1?.team_id ===
                                        team.team_id;
                                    return isTeam1
                                        ? match.participants?.team2?.team_name
                                        : match.participants?.team1?.team_name;
                                };

                                const result = getMatchResult();
                                const score = getMatchScore();
                                const opponent = getOpponent();

                                return (
                                    <div
                                        key={match.match_id}
                                        className="border-border bg-secondBg hover:bg-thirdBg cursor-pointer rounded-lg border p-5 transition-all hover:shadow-lg"
                                        onClick={() => {
                                            if (match.faceit_url) {
                                                openInNewTab(match.faceit_url);
                                            }
                                        }}
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            {match.round && (
                                                <span className="bg-firstbg-thirdBg text-textSecondary rounded-full px-3 py-1 text-sm font-medium">
                                                    {match.round}
                                                </span>
                                            )}
                                            {match.scheduled_at && (
                                                <span className="text-textSecondary text-sm">
                                                    {formatDateOnly(
                                                        match.scheduled_at,
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-1 items-center gap-4">
                                                <span className="text-textPrimary font-semibold">
                                                    {team.name}
                                                </span>
                                                <span className="text-textPrimary min-w-[60px] text-center text-lg font-bold">
                                                    {score}
                                                </span>
                                                <span className="text-textPrimary font-semibold">
                                                    {opponent || "TBD"}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                {result !== "-" && (
                                                    <span
                                                        className={`min-w-[30px] rounded-full px-3 py-1 text-center text-sm font-bold ${
                                                            result === "W"
                                                                ? "bg-green-100 text-green-700"
                                                                : result === "L"
                                                                  ? "bg-red-100 text-red-700"
                                                                  : "bg-orange-100 text-orange-600"
                                                        }`}
                                                    >
                                                        {result}
                                                    </span>
                                                )}
                                                {match.status && (
                                                    <span className="text-textSecondary text-xs uppercase">
                                                        {match.status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                ) : (
                    <div className="text-textSecondary py-10 text-center text-base">
                        No matches found for this stage.
                    </div>
                )}
            </div>
        </div>
    );
}
