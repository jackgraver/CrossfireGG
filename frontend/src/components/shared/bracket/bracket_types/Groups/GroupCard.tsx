import {
    GroupWithMatchesDTO,
    MatchParticipantWithTeamDTO,
    MatchWithParticipantAndMinifiedMapsDTO,
} from "@repo/contracts";
import { useMemo } from "react";
import TeamStandingsRow from "./TeamStandingsRow";
import MatchesDropdown from "./MatchesDropdown";

export default function GroupCard({
    group,
    matches,
}: {
    group: GroupWithMatchesDTO;
    matches: MatchWithParticipantAndMinifiedMapsDTO[];
}) {
    const { groupTeams, noMatchesPlayed } = useMemo(() => {
        const teamMap = new Map<number, MatchParticipantWithTeamDTO>();
        matches.forEach((m) => {
            m.participants?.forEach((p) => {
                if (!teamMap.has(p.stageTeam.team.id)) {
                    teamMap.set(p.stageTeam.team.id, p);
                }
            });
        });
        const teams = Array.from(teamMap.values());
        const noMatchesPlayed = teams.every(
            (t) => t.stageTeam.wins === 0 && t.stageTeam.losses === 0,
        );
        const sorted = noMatchesPlayed
            ? [...teams].sort((a, b) => a.stageTeam.seed - b.stageTeam.seed)
            : [...teams].sort((a, b) => b.stageTeam.wins - a.stageTeam.wins);
        return { groupTeams: sorted, noMatchesPlayed };
    }, [matches]);

    return (
        <div className="group/card border-border/60 bg-firstBg/50 flex h-fit flex-col rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/40">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-textPrimary text-xl font-black tracking-tight uppercase">
                        {group.name}
                    </h2>
                </div>
            </div>
            <div className="bg-firstBg mb-2 flex flex-col rounded-lg p-1">
                <div className="text-textSecondary/40 flex items-center px-3 py-2 text-[10px] font-black tracking-widest uppercase">
                    <span className="w-6 text-center">#</span>
                    <span className="ml-3 flex-1">Team</span>
                    <span>Record</span>
                </div>
                {groupTeams.map((team, index) => (
                    <TeamStandingsRow
                        key={team.id}
                        team={team}
                        index={index}
                        noMatchesPlayed={noMatchesPlayed}
                    />
                ))}
            </div>
            {matches.length > 0 && <MatchesDropdown matches={matches} />}
        </div>
    );
}
