import { useState } from "react";
import {
    GroupWithMatchesDTO,
    MatchParticipantWithTeamDTO,
    MatchWithParticipantsDTO,
    StageTeamWithTeamDTO,
    TeamDTO,
} from "@repo/contracts";
import { useStageTeams } from "@/app/tournament/$tournamentId/stage/$stageId/-queries/tournament.queries";
import { getMatchesByGroup } from "../Bracket.util";
import MatchCard from "../components/MatchCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import TeamLogo from "../atoms/TeamLogo";
import { Link } from "@tanstack/react-router";

function TeamStandingsRow({ team, rank }: { team: MatchParticipantWithTeamDTO; rank: number }) {
    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.id.toString() }}
            className="border-border hover:bg-thirdBg flex items-center gap-3 border-b py-2 transition-all duration-300 ease-out last:border-b-0"
        >
            <span className="text-textSecondary w-6 text-center text-sm font-medium">{rank}</span>
            <TeamLogo
                team={{
                    team_id: team.id.toString(),
                    name: team.team.name,
                    team_logo: team.team.team_logo,
                    faceit_id: team.team.faceit_id || "",
                    team_captain_id: team.team.team_captain_id,
                }}
                styling="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-textPrimary flex-1 truncate text-sm font-medium">
                {team.team.name}
            </span>
            <span className="text-textSecondary pr-2 text-sm">
                {team.wins}-{team.losses}
            </span>
        </Link>
    );
}

function MatchesDropdown({ matches }: { matches: MatchWithParticipantsDTO[] }) {
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
        {} as Record<string, MatchWithParticipantsDTO[]>,
    );

    return (
        <div className="border-border mt-4 border-t pt-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-textSecondary hover:text-textPrimary flex w-full items-center justify-between text-sm font-medium transition-colors"
            >
                <span>View Matches ({matches.length})</span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
                <div className="mt-3 flex flex-col gap-4">
                    {Object.entries(matchesByRound).map(([round, roundMatches]) => (
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
                    ))}
                </div>
            )}
        </div>
    );
}

function GroupCard({
    group,
    matches,
}: {
    group: GroupWithMatchesDTO;
    matches: MatchWithParticipantsDTO[];
}) {
    const groupTeams = Array.from(
        new Map(matches.flatMap((m) => m.participants).map((p) => [p.team_id, p])).values(),
    );

    return (
        <div className="border-border bg-firstBg flex min-w-[300px] flex-col rounded-lg border p-4">
            <h2 className="text-textPrimary mb-3 text-lg font-semibold">{group.name}</h2>
            <div className="flex flex-col">
                {groupTeams.map((team, index) => (
                    <TeamStandingsRow key={team.id} team={team} rank={0} />
                ))}
            </div>
            {matches.length > 0 && <MatchesDropdown matches={matches} />}
        </div>
    );
}

export default function Groups({ groups }: { groups: GroupWithMatchesDTO[] }) {
    return (
        <div className="flex flex-wrap items-start gap-4 overflow-x-auto p-4">
            {groups.map((group) => (
                <GroupCard key={group.id} group={group} matches={group.matches} />
            ))}
        </div>
    );
}
