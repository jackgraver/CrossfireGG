import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTournament } from "../queries/tournamentQueries";
import { formatDateOnly } from "@/lib/dateUtils";
import RegularSeasonBracket from "@/shared/bracket/RegularSeasonBracket";
import Standings from "@/shared/Standings";

export const Route = createFileRoute("/tournament/$tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { tournament: tournamentId } = Route.useParams();
    const [viewMode, setViewMode] = useState<"bracket" | "standings">(
        "bracket",
    );
    const { data, isLoading, error } = useTournament(tournamentId);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading tournament...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-red-500">
                    Error loading tournament: {error.message}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textSecondary">Tournament not found</div>
            </div>
        );
    }

    const { tournament, matches, teams } = data;

    return (
        <div className="mx-auto min-h-screen max-w-[1400px] p-5">
            <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
                <h1 className="text-textPrimary mb-4 text-4xl font-bold">
                    {tournament.t_name}
                </h1>
                <div className="text-textSecondary flex flex-wrap gap-6">
                    {tournament.start_date && (
                        <div>
                            <span className="font-semibold">Start Date: </span>
                            {formatDateOnly(tournament.start_date)}
                        </div>
                    )}
                    {tournament.end_date && (
                        <div>
                            <span className="font-semibold">End Date: </span>
                            {formatDateOnly(tournament.end_date)}
                        </div>
                    )}
                    <div>
                        <span className="font-semibold">Teams Signed Up: </span>
                        {tournament.teams_signed_up}
                    </div>
                </div>
            </div>

            <div className="mb-6 flex gap-4">
                <button
                    onClick={() => setViewMode("bracket")}
                    className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                        viewMode === "bracket"
                            ? "bg-blue-600 text-white"
                            : "bg-secondBg text-textSecondary hover:bg-thirdBg"
                    }`}
                >
                    Bracket
                </button>
                <button
                    onClick={() => setViewMode("standings")}
                    className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                        viewMode === "standings"
                            ? "bg-blue-600 text-white"
                            : "bg-secondBg text-textSecondary hover:bg-thirdBg"
                    }`}
                >
                    Standings
                </button>
            </div>

            <div className="bg-firstBg rounded-xl p-8 shadow-md">
                {viewMode === "bracket" ? (
                    matches && matches.length > 0 ? (
                        <RegularSeasonBracket matches={matches} />
                    ) : (
                        <div className="text-textSecondary">
                            No matches found for this tournament
                        </div>
                    )
                ) : teams && teams.length > 0 ? (
                    <Standings teams={teams} />
                ) : (
                    <div className="text-textSecondary">
                        No teams found for this tournament
                    </div>
                )}
            </div>

            <div className="bg-firstBg mt-8 rounded-xl p-8 shadow-md">
                <h2 className="text-textPrimary mb-6 text-2xl font-bold">
                    Stages
                </h2>
                {tournament.stages.length === 0 ? (
                    <div className="text-textSecondary">
                        No stages found for this tournament
                    </div>
                ) : (
                    <div className="space-y-6">
                        {tournament.stages.map((stage) => (
                            <div
                                key={stage.sub_t_id}
                                className="border-border bg-secondBg rounded-lg border p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-textPrimary text-xl font-semibold">
                                        {stage.t_name}
                                    </h3>
                                    {stage.is_current && (
                                        <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <div className="text-textSecondary mb-4 flex flex-wrap gap-4 text-sm">
                                    {stage.start_date && (
                                        <div>
                                            <span className="font-semibold">
                                                Start:{" "}
                                            </span>
                                            {formatDateOnly(stage.start_date)}
                                        </div>
                                    )}
                                    {stage.end_date && (
                                        <div>
                                            <span className="font-semibold">
                                                End:{" "}
                                            </span>
                                            {formatDateOnly(stage.end_date)}
                                        </div>
                                    )}
                                    {stage.format && (
                                        <div>
                                            <span className="font-semibold">
                                                Format:{" "}
                                            </span>
                                            {stage.format}
                                        </div>
                                    )}
                                </div>
                                {stage.format === "groups" &&
                                    stage.groups &&
                                    stage.groups.length > 0 && (
                                        <div>
                                            <h4 className="text-textPrimary mb-3 font-semibold">
                                                Groups:
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {stage.groups.map((group) => (
                                                    <div
                                                        key={group.group_id}
                                                        className="bg-thirdBg border-border rounded-md border px-4 py-2"
                                                    >
                                                        <span className="text-textPrimary">
                                                            {group.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
