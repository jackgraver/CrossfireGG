import { useState } from "react";
import { Match } from "@/types/Types";
import { useStageTeams } from "@/app/tournament/-queries/tournamentQueries";
import type { GroupWithTeams } from "@/app/tournament/-api/tournamentApi";
import { getMatchesByGroup } from "../Bracket.util";
import MatchCard from "../components/MatchCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import TeamLogo from "../atoms/TeamLogo";

function TeamStandingsRow({
    team,
    rank,
}: {
    team: GroupWithTeams["teams"][0];
    rank: number;
}) {
    return (
        <div className="border-border flex items-center gap-3 border-b py-2 last:border-b-0">
            <span className="text-textSecondary w-6 text-center text-sm font-medium">
                {rank}
            </span>
            <TeamLogo
                team={{
                    team_id: team.team_id.toString(),
                    name: team.team_name,
                    team_logo: team.team_logo,
                    faceit_id: team.faceit_id || "",
                    team_captain_id: "",
                }}
                styling="h-6 w-6 rounded object-cover"
            />
            <span className="text-textPrimary flex-1 truncate text-sm font-medium">
                {team.team_name}
            </span>
            <span className="text-textSecondary text-sm">
                {team.wins}-{team.losses}
            </span>
        </div>
    );
}

function MatchesDropdown({ matches }: { matches: Match[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const matchesByRound = matches.reduce(
        (acc, match) => {
            const round = match.round || "TBD";
            if (!acc[round]) {
                acc[round] = [];
            }
            acc[round].push(match);
            return acc;
        },
        {} as Record<string, Match[]>,
    );

    return (
        <div className="border-border mt-4 border-t pt-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-textSecondary hover:text-textPrimary flex w-full items-center justify-between text-sm font-medium transition-colors"
            >
                <span>View Matches ({matches.length})</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )}
            </button>
            {isOpen && (
                <div className="mt-3 flex flex-col gap-4">
                    {Object.entries(matchesByRound).map(
                        ([round, roundMatches]) => (
                            <div key={round} className="flex flex-col gap-2">
                                <span className="text-textSecondary text-xs font-bold uppercase opacity-60">
                                    Round {round}
                                </span>
                                <div className="flex flex-col gap-2">
                                    {roundMatches.map((match, mIndex) => (
                                        <MatchCard key={mIndex} match={match} />
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}

function GroupCard({
    group,
    matches,
}: {
    group: GroupWithTeams;
    matches: Match[];
}) {
    return (
        <div className="border-border bg-firstBg flex min-w-[300px] flex-col rounded-lg border p-4">
            <h2 className="text-textPrimary mb-3 text-lg font-semibold">
                {group.group_name}
            </h2>
            <div className="flex flex-col">
                {group.teams.map((team, index) => (
                    <TeamStandingsRow
                        key={team.team_id}
                        team={team}
                        rank={index + 1}
                    />
                ))}
            </div>
            {matches.length > 0 && <MatchesDropdown matches={matches} />}
        </div>
    );
}

export default function Groups({
    stageId,
    matches,
}: {
    stageId: number | null;
    matches: Match[];
}) {
    const { data: stageTeamsData, isLoading } = useStageTeams(stageId);
    const matchesByGroup = getMatchesByGroup(matches);

    if (isLoading) {
        return <div className="text-textSecondary p-4">Loading groups...</div>;
    }

    if (!stageTeamsData?.groups || stageTeamsData.groups.length === 0) {
        return <div className="text-textSecondary p-4">No groups found</div>;
    }

    return (
        <div className="flex flex-wrap items-start gap-4 overflow-x-auto p-4">
            {stageTeamsData.groups.map((group) => (
                <GroupCard
                    key={group.group_id}
                    group={group}
                    matches={matchesByGroup[String(group.group_id)] || []}
                />
            ))}
        </div>
    );
}
