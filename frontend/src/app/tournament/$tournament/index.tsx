import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
    useTournament,
    useMatchesByStage,
} from "../-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import RegularSeasonBracket from "@/shared/bracket/bracket_types/RegularSeasonBracket";
import Standings from "@/shared/Standings";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";

export const Route = createFileRoute("/tournament/$tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { tournament: tournamentId } = Route.useParams();
    const [viewMode, setViewMode] = useState<"bracket" | "standings">(
        "bracket",
    );
    const { data: tournament, isLoading, error } = useTournament(tournamentId);

    const defaultStage = useMemo(() => {
        if (!tournament?.stages) return null;
        return (
            tournament.stages.find((stage) => stage.is_current) ||
            tournament.stages[0] ||
            null
        );
    }, [tournament]);

    const [currentStage, setCurrentStage] = useState(defaultStage);

    useEffect(() => {
        setCurrentStage(defaultStage);
    }, [defaultStage]);

    const {
        data: matchesData,
        isLoading: matchesLoading,
        error: matchesError,
    } = useMatchesByStage(currentStage?.ID ?? null);

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

    if (!tournament) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textSecondary">Tournament not found</div>
            </div>
        );
    }

    const matches = matchesData?.matches || [];

    return (
        <div className="mx-auto min-h-screen max-w-[1400px] p-5">
            <div className="bg-firstBg mb-8 rounded-xl p-8 shadow-md">
                <h1 className="text-textPrimary mb-4 text-4xl font-bold">
                    {tournament.name}
                </h1>
                <div className="text-textSecondary flex flex-wrap gap-6">
                    {tournament.start_date && (
                        <div>
                            <span className="font-semibold">Start Date: </span>
                            {formatDateOnly(
                                toUnixTimestamp(tournament.start_date)!,
                            )}
                        </div>
                    )}
                    {tournament.end_date && (
                        <div>
                            <span className="font-semibold">End Date: </span>
                            {formatDateOnly(
                                toUnixTimestamp(tournament.end_date)!,
                            )}
                        </div>
                    )}
                    {currentStage && (
                        <div>
                            <span className="font-semibold">Teams: </span>
                            {currentStage.teams_count ?? 0}/
                            {currentStage.max_teams}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-firstBg rounded-xl p-8 shadow-md">
                <h2 className="text-textPrimary text-2xl font-bold">Stages</h2>
            </div>
            {tournament.stages.length === 0 ? (
                <div className="text-textSecondary">
                    No stages found for this tournament
                </div>
            ) : (
                <div className="flex flex-row items-start gap-4">
                    {tournament.stages.map((stage) => (
                        <div
                            key={stage.ID}
                            onClick={() => setCurrentStage(stage)}
                            className={`border-border bg-secondBg flex-1 cursor-pointer rounded-lg border p-6 transition-all ${
                                currentStage?.ID === stage.ID
                                    ? "bg-thirdBg ring-2 ring-blue-500"
                                    : "hover:bg-thirdBg"
                            }`}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-textPrimary text-xl font-semibold">
                                    {stage.name}
                                </h3>
                                {stage.is_current && (
                                    <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                                        Current
                                    </span>
                                )}
                            </div>
                            <div className="text-textSecondary mb-4 flex flex-col flex-wrap gap-4 text-sm">
                                {stage.registration_deadline && (
                                    <div>
                                        <span className="font-semibold">
                                            Registration Deadline:{" "}
                                        </span>
                                        {formatDateOnly(
                                            toUnixTimestamp(
                                                stage.registration_deadline,
                                            )!,
                                        )}
                                    </div>
                                )}
                                {stage.format && (
                                    <div>
                                        <span className="font-semibold">
                                            Format:{" "}
                                        </span>
                                        {stage.format?.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-6 flex gap-4">
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
                    matchesLoading ? (
                        <div className="text-textSecondary">
                            Loading matches...
                        </div>
                    ) : matchesError ? (
                        <div className="text-red-500">
                            Error loading matches: {matchesError.message}
                        </div>
                    ) : matches && matches.length > 0 ? (
                        <TopLevelBracket
                            stageFormat={currentStage?.format}
                            stageId={currentStage?.ID ?? null}
                            matches={matches}
                        />
                    ) : (
                        <div className="text-textSecondary">
                            {currentStage
                                ? `No matches found for stage: ${currentStage.name}`
                                : "No current stage found"}
                        </div>
                    )
                ) : (
                    <div className="text-textSecondary">
                        <Standings teams={[]} />
                    </div>
                )}
            </div>
        </div>
    );
}
