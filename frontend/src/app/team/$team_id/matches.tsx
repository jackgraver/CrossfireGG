import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTeam, useTeamMatchesByStage } from "../-queries/teamQueries";
import { formatMatchDate } from "@/lib/dateUtils";
import { openInNewTab } from "@/lib/NewTab";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import type { FormattedMatch } from "@/types/TeamModel";

export const Route = createFileRoute("/team/$team_id/matches")({
    component: MatchesPage,
});

function MatchesPage() {
    const { team_id } = Route.useParams();
    const { data: teamData } = useTeam(team_id);
    const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

    const stages =
        teamData?.tournaments.flatMap((t) =>
            t.stages.map((s) => ({ ...s, tournament_name: t.tournament_name })),
        ) || [];

    useEffect(() => {
        if (stages.length > 0 && !selectedStageId) {
            setSelectedStageId(stages[0].stage_id);
        }
    }, [stages, selectedStageId]);

    const { data: matches, isLoading } = useTeamMatchesByStage(
        team_id,
        selectedStageId,
    );

    const sortedMatches = matches
        ? [...matches].sort(
              (a, b) => (b.scheduled_at ?? 0) - (a.scheduled_at ?? 0),
          )
        : [];

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Matches
                </h2>
                {stages.length > 0 && (
                    <select
                        value={selectedStageId || ""}
                        onChange={(e) => setSelectedStageId(e.target.value)}
                        className="border-border bg-secondBg text-textPrimary rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                        {stages.map((stage) => (
                            <option key={stage.stage_id} value={stage.stage_id}>
                                {stage.tournament_name} - {stage.stage_name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="p-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading matches...
                    </div>
                ) : sortedMatches.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No matches found for this stage
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {sortedMatches.map((match) => (
                            <MatchCard
                                key={match.match_id}
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
    match: FormattedMatch;
    teamId: string;
}) {
    const { team1, team2 } = match.participants;
    const isTeam1 = team1?.team_id === teamId;
    const ourTeam = isTeam1 ? team1 : team2;
    const opponent = isTeam1 ? team2 : team1;

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
        <div
            onClick={() => match.faceit_url && openInNewTab(match.faceit_url)}
            className={`border-border bg-secondBg rounded-lg border p-4 transition-all ${
                match.faceit_url ? "hover:bg-thirdBg cursor-pointer" : ""
            }`}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {match.status && (
                        <span
                            className={`rounded px-2 py-0.5 text-xs font-medium ${getStatusStyle()}`}
                        >
                            {match.status.toUpperCase()}
                        </span>
                    )}
                </div>
                {match.scheduled_at && (
                    <span className="text-textSecondary text-sm">
                        {formatMatchDate(match.scheduled_at)}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <TeamLogo
                        team={
                            ourTeam
                                ? {
                                      team_id: ourTeam.team_id,
                                      name: ourTeam.name,
                                      team_logo: ourTeam.team_logo,
                                      faceit_id: ourTeam.faceit_id || "",
                                      team_captain_id: ourTeam.team_captain_id,
                                  }
                                : undefined
                        }
                        styling="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="text-textPrimary truncate font-semibold">
                        {ourTeam?.name || "TBD"}
                    </span>
                </div>
                <span className="text-textSecondary shrink-0 px-4 text-sm font-medium">
                    vs
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                    <span className="text-textPrimary truncate font-semibold">
                        {opponent?.name || "TBD"}
                    </span>
                    <TeamLogo
                        team={
                            opponent
                                ? {
                                      team_id: opponent.team_id,
                                      name: opponent.name,
                                      team_logo: opponent.team_logo,
                                      faceit_id: opponent.faceit_id || "",
                                      team_captain_id: opponent.team_captain_id,
                                  }
                                : undefined
                        }
                        styling="h-10 w-10 rounded-md object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
