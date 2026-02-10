import { useState, useMemo } from "react";
import {
    GroupWithMatchesDTO,
    MatchParticipantWithTeamDTO,
    MatchWithParticipantsDTO,
} from "@repo/contracts";
import MatchCard from "../components/MatchCard";
import { ChevronDown, ChevronUp, Trophy, Calendar, Users } from "lucide-react";
import TeamLogo from "../atoms/TeamLogo";
import { Link } from "@tanstack/react-router";

function TeamStandingsRow({
    team,
    index,
    totalTeams,
}: {
    team: MatchParticipantWithTeamDTO;
    index: number;
    totalTeams: number;
}) {
    // Determine if team is in the "Qualification Zone" (top 2 for now, could be dynamic)
    const isQualifying = index < 2;

    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.stageTeam.team.id.toString() }}
            className={`group relative flex items-center gap-3 border-b border-border/50 py-3 px-2 transition-all duration-200 last:border-b-0 hover:bg-white/5
                ${isQualifying ? "before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-green-500 before:rounded-full" : ""}`}
        >
            <div className="flex w-6 justify-center text-xs font-bold text-textSecondary/50">
                {index + 1}
            </div>
            <TeamLogo
                team={{
                    team_id: team.stageTeam.team.id.toString(),
                    name: team.stageTeam.team.name,
                    team_logo: team.stageTeam.team.team_logo,
                    faceit_id: team.stageTeam.team.faceit_id || "",
                    team_captain_id: team.stageTeam.team.team_captain_id,
                }}
                styling="h-8 w-8 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-1 flex-col min-w-0">
                <span className="text-textPrimary truncate text-sm font-semibold group-hover:text-white transition-colors">
                    {team.stageTeam.team.name}
                </span>
                {isQualifying && (
                    <span className="text-[10px] uppercase tracking-wider text-green-500 font-bold">
                        Qualifying
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-textPrimary">
                        {team.stageTeam.wins}W - {team.stageTeam.losses}L
                    </span>
                    <span className="text-[10px] text-textSecondary uppercase font-medium">
                        Record
                    </span>
                </div>
            </div>
        </Link>
    );
}

function MatchesDropdown({ matches }: { matches: MatchWithParticipantsDTO[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const matchesByRound = useMemo(
        () =>
            matches.reduce(
                (acc, match) => {
                    const round = match.round || "TBD";
                    if (!acc[round]) {
                        acc[round] = [];
                    }
                    acc[round].push(match);
                    return acc;
                },
                {} as Record<string, MatchWithParticipantsDTO[]>,
            ),
        [matches],
    );

    return (
        <div className="mt-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between rounded-md p-3 text-sm font-bold transition-all
                    ${isOpen ? "bg-white/5 text-white" : "text-textSecondary hover:bg-white/5 hover:text-white"}`}
            >
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 opacity-70" />
                    <span>Group Matches</span>
                    <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold">
                        {matches.length}
                    </span>
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {isOpen && (
                <div className="mt-2 space-y-6 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    {Object.entries(matchesByRound).map(([round, roundMatches]) => (
                        <div key={round} className="space-y-3">
                            <div className="flex items-center gap-2 px-1">
                                <div className="h-px flex-1 bg-border/50" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-textSecondary/60">
                                    Round {round}
                                </span>
                                <div className="h-px flex-1 bg-border/50" />
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {roundMatches.map((match, mIndex) => (
                                    <div
                                        key={mIndex}
                                        className="transform transition-transform hover:scale-[1.01]"
                                    >
                                        <MatchCard match={match} margin={false} />
                                    </div>
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
    const groupTeams = useMemo(() => {
        const teamMap = new Map<number, MatchParticipantWithTeamDTO>();
        matches.forEach((m) => {
            m.participants?.forEach((p) => {
                if (!teamMap.has(p.stageTeam.team.id)) {
                    teamMap.set(p.stageTeam.team.id, p);
                }
            });
        });
        return Array.from(teamMap.values()).sort((a, b) => b.stageTeam.wins - a.stageTeam.wins);
    }, [matches]);

    return (
        <div className="group/card border-border/60 bg-firstBg/50 flex flex-col rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-textPrimary text-xl font-black tracking-tight uppercase">
                        {group.name}
                    </h2>
                </div>
            </div>

            <div className="mb-4 flex flex-col rounded-lg bg-black/20 p-1">
                <div className="flex items-center px-3 py-2 text-[10px] font-black uppercase tracking-widest text-textSecondary/40">
                    <span className="w-6 text-center">#</span>
                    <span className="flex-1 ml-3">Team</span>
                    <span>Record</span>
                </div>
                {groupTeams.map((team, index) => (
                    <TeamStandingsRow
                        key={team.id}
                        team={team}
                        index={index}
                        totalTeams={groupTeams.length}
                    />
                ))}
            </div>

            {matches.length > 0 && <MatchesDropdown matches={matches} />}
        </div>
    );
}

export default function Groups({ groups }: { groups: GroupWithMatchesDTO[] }) {
    if (!groups || groups.length === 0) {
        return (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-firstBg/20 text-center">
                <Trophy className="mb-4 h-12 w-12 opacity-20" />
                <h3 className="text-lg font-bold text-textPrimary">No Groups Found</h3>
                <p className="text-sm text-textSecondary">
                    Groups haven't been generated for this stage yet.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
                <GroupCard key={group.id} group={group} matches={group.matches} />
            ))}
        </div>
    );
}
