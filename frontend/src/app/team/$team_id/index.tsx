import {
    createFileRoute,
    Link,
} from "@tanstack/react-router";
import { BooleanStatus } from "@/types/TeamModel";
import { useTeam } from "../-queries/teamQueries";
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

    if (!team_id) {
        return (
            <TeamNotFoundFallback message="The team ID is missing or invalid. Please check the URL and try again." />
        );
    }

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
            <TeamNotFoundFallback message="Failed to load team information. The team may not exist or there was an error connecting to the server." />
        );
    }

    if (!data) {
        return <TeamNotFoundFallback />;
    }

    const { team, matches } = data;

    const canManagePlayers =
        session?.team_id &&
        parseInt(team_id) === session.team_id;

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
            {canManagePlayers && (
                <TeamPlayerManagement team_id={team_id} team={team} />
            )}
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
                                    return match?.participants?.[0]?.team_id ===
                                        team.team_id
                                        ? match?.participants?.[1]?.team?.name
                                        : match?.participants?.[0]?.team?.name;
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
