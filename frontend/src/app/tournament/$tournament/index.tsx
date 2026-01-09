import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useTournament } from "../-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import type { Stage } from "@/types/TournamentModel";

export const Route = createFileRoute("/tournament/$tournament/")({
    component: TournamentOverview,
});

function TournamentOverview() {
    const { tournament: tournamentId } = Route.useParams();
    const { data: tournament, isLoading, error } = useTournament(tournamentId);

    if (isLoading) {
        return (
            <div className="text-textSecondary py-8 text-center">
                Loading overview...
            </div>
        );
    }

    if (error || !tournament) {
        return (
            <div className="text-textSecondary py-8 text-center">
                Failed to load tournament data
            </div>
        );
    }

    if (tournament.stages.length === 0) {
        return (
            <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                <p className="text-textSecondary">
                    No stages have been created for this tournament yet.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-firstBg rounded-xl shadow-md">
                <div className="border-border border-b p-4">
                    <h2 className="text-textPrimary text-lg font-semibold">
                        Tournament Stages
                    </h2>
                </div>
                <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tournament.stages.map((stage) => (
                        <StageCard key={stage.ID} stage={stage} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StageCard({ stage }: { stage: Stage }) {
    return (
        <div className="border-border bg-secondBg relative rounded-lg border p-4">
            <div className="mb-3 flex items-start justify-between">
                <h3 className="text-textPrimary font-medium">{stage.name}</h3>
                {stage.is_current && (
                    <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                        Current
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-2 text-sm">
                {stage.format && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-textSecondary">Format:</span>
                        <span className="text-textPrimary">
                            {stage.format.name}
                        </span>
                    </div>
                )}
                <div className="flex items-center gap-1.5">
                    <span className="text-textSecondary">Teams:</span>
                    <span className="text-textPrimary">
                        {stage.teams_count ?? 0}/{stage.max_teams}
                    </span>
                </div>
                {stage.start_date && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-textSecondary">Start:</span>
                        <span className="text-textPrimary">
                            {formatDateOnly(toUnixTimestamp(stage.start_date)!)}
                        </span>
                    </div>
                )}
                {stage.registration_deadline && (
                    <div className="flex items-center gap-1.5">
                        <span className="text-textSecondary">
                            Reg. Deadline:
                        </span>
                        <span className="text-textPrimary">
                            {formatDateOnly(
                                toUnixTimestamp(stage.registration_deadline)!,
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
