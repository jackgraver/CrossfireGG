import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
    useTeam,
    useTeamMatches,
    useTeamMatchesByStage,
} from "@/lib/api/team.queries";
import { formatMatchDate } from "@/lib/date.utils";
import { openInNewTab } from "@/utils/openInNewTab";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import ErrorComponent from "../-components/ErrorComponent";
import { MatchWithParticipantsDTO } from "../../../../../shared/contracts/dist/match.contracts";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/team/$team_id/matches")({
    component: MatchesPage,
    errorComponent: ErrorComponent,
});

function MatchesPage() {
    const { team_id } = Route.useParams();
    const { data: matches, isLoading, error } = useTeamMatches(team_id);

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Matches
                </h2>
            </div>
            <div className="p-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading matches...
                    </div>
                ) : matches?.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No matches found for this stage
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {matches?.map((match) => (
                            <MatchCard
                                key={match.id}
                                match={match}
                                teamId={team_id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function MatchCard({
    match,
    teamId,
}: {
    match: MatchWithParticipantsDTO;
    teamId: string;
}) {
    const team = match.participants.find(
        (p) => p.stageTeam.team_id === parseInt(teamId),
    );

    const opponent = match.participants.find(
        (p) => p.stageTeam.team_id !== parseInt(teamId),
    );

    const getStatusStyle = () => {
        switch (match.status?.toUpperCase()) {
            case "FINISHED":
                return "bg-green-500/20 text-green-400";
            case "ONGOING":
            case "LIVE":
                return "bg-blue-500/20 text-blue-400";
            case "SCHEDULED":
                return "bg-yellow-500/20 text-yellow-400";
            case "CANCELLED":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-thirdBg text-textSecondary";
        }
    };

    return (
        <Link to={"/match/$matchId"} params={{ matchId: opponent?.match_id }}>
            <div
                className={cn(
                    "flex flex-row rounded-md border-2 p-2",
                    opponent?.winner
                        ? "border-red-500/20"
                        : "border-green-500/20",
                )}
            >
                <p>vs {opponent?.stageTeam.team.name}</p>
                <p>
                    {team?.score} - {opponent?.score}
                </p>
            </div>
        </Link>
    );
}
