import { createFileRoute } from "@tanstack/react-router";
import type { Match } from "@/types/Types";
import { BooleanStatus } from "@/types/TeamModel";
import { useTeam } from "../queries/teamQueries";
import { formatDateOnly } from "@/lib/dateUtils";
import { notFound } from "@tanstack/react-router";
import TeamLogo from "@/shared/bracket/TeamLogo";
import { openInNewTab } from "@/lib/NewTab";

export const Route = createFileRoute("/team/$team_id/")({
    component: Team,
});

function Team() {
    const { team_id } = Route.useParams();

    if (!team_id) return notFound();

    const { data, isLoading, error } = useTeam(team_id);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-red-500">
                    Error loading team: {error.message}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textSecondary">Team not found</div>
            </div>
        );
    }

    const { team, matches } = data;

    const formatDate = (timestamp: number) => {
        return formatDateOnly(timestamp);
    };

    const getMatchResult = (match: Match) => {
        if (match.status !== "FINISHED") return "Scheduled";
        if (match.winner === team.team_id) return "W";
        return "L";
    };

    const getMatchScore = (match: Match) => {
        if (match.status !== "FINISHED") return "vs";
        return `${match.team1_score}-${match.team2_score}`;
    };

    const getOpponent = (match: Match) => {
        return match?.teams?.team1?.team_id === team.team_id
            ? match?.teams?.team2?.team_name
            : match?.teams?.team1?.team_name;
    };

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
                                {team.team_name}
                            </h1>
                            {team.win !== undefined &&
                                team.loss !== undefined && (
                                    <h2 className="text-textSecondary text-2xl font-bold">
                                        ({team.win}-{team.loss})
                                    </h2>
                                )}
                        </div>
                        <div className="text-textPrimary flex flex-wrap gap-6">
                            {team.seed !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Seed:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.seed}
                                    </span>
                                </div>
                            )}
                            {team.paid !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Paid:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.paid === BooleanStatus.True
                                            ? "Yes"
                                            : team.paid ===
                                                BooleanStatus.Pending
                                              ? "Pending"
                                              : "No"}
                                    </span>
                                </div>
                            )}
                            {team.joined_tournament !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-textSecondary text-sm font-semibold">
                                        Joined Tournament:
                                    </span>
                                    <span className="text-textSecondary text-lg">
                                        {team.joined_tournament ===
                                        BooleanStatus.True
                                            ? "Yes"
                                            : team.joined_tournament ===
                                                BooleanStatus.Pending
                                              ? "Pending"
                                              : "No"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-firstBg rounded-xl p-8 shadow-md">
                <h2 className="text-textPrimary mb-6 text-2xl font-bold">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches
                            .sort(
                                (a, b) =>
                                    (b.scheduled_at ?? 0) -
                                    (a.scheduled_at ?? 0),
                            )
                            .map((match) => {
                                const getMatchResult = () => {
                                    if (match.status !== "FINISHED")
                                        return "Scheduled";
                                    if (match.winner === team.team_id)
                                        return "W";
                                    return "L";
                                };

                                const getMatchScore = () => {
                                    if (match.status !== "FINISHED")
                                        return "vs";
                                    return `${match.team1_score ?? 0}-${match.team2_score ?? 0}`;
                                };

                                const getOpponent = () => {
                                    return match?.teams?.team1?.team_id ===
                                        team.team_id
                                        ? match?.teams?.team2?.team_name
                                        : match?.teams?.team1?.team_name;
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
                                                    {team.team_name}
                                                </span>
                                                <span className="text-textPrimary min-w-[60px] text-center text-lg font-bold">
                                                    {score}
                                                </span>
                                                <span className="text-textPrimary font-semibold">
                                                    {opponent || "TBD"}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
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
                        No matches found.
                    </div>
                )}
            </div>
        </div>
    );
}
