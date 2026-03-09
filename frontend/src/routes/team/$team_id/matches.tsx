import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
    useTeam,
    useTeamMatches,
    useTeamMatchesByStage,
} from "@/lib/api/team.queries";
import {
    formatDateOnly,
    formatFullDate,
    formatMatchDate,
} from "@/lib/date.utils";
import { openInNewTab } from "@/utils/openInNewTab";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import ErrorComponent from "../-components/ErrorComponent";
import { MatchWithParticipantsDTO } from "@repo/contracts";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/team/$team_id/matches")({
    component: MatchesPage,
    errorComponent: ErrorComponent,
});

function MatchesPage() {
    const { team_id } = Route.useParams();
    const { data: matches, isLoading, error } = useTeamMatches(team_id);

    return (
        <div className="rounded-xl shadow-md">
            <div className="">
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
        <Link
            to={"/match/$matchId"}
            params={{ matchId: opponent?.match_id }}
            className="group block"
        >
            <div
                className={cn(
                    "flex flex-col gap-2 rounded-md border p-3 transition-colors",
                    opponent?.winner
                        ? "border-red-500/60 hover:border-red-500/80"
                        : "border-green-500/60 hover:border-green-500/80",
                )}
            >
                {match.scheduled_at && (
                    <span className="text-muted-foreground text-xs">
                        {formatDateOnly(match.scheduled_at)}
                    </span>
                )}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-lg font-medium">
                        <span>vs {opponent?.stageTeam.team.name}</span>
                        <TeamLogo
                            avatar={
                                opponent?.stageTeam.team.team_logo ?? undefined
                            }
                            styling="h-8 w-8 rounded-full"
                        />
                    </div>
                    <span className="text-lg font-semibold">
                        {team?.score} – {opponent?.score}
                    </span>
                </div>
            </div>
        </Link>
    );
}
