import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTeam, useTeamMembersRoster } from "@/lib/api/team.queries";
import PlayerCard from "./-components/PlayerCard";
import type {
    TeamMemberPlayerDTO,
    TeamMembersRosterDTO,
} from "@repo/contracts";
import { Users } from "lucide-react";

export const Route = createFileRoute("/team/$team_id/members")({
    component: MembersPage,
});

function sortMembers(
    members: TeamMemberPlayerDTO[],
    teamCaptainId?: number,
): TeamMemberPlayerDTO[] {
    return [...members].sort((a, b) => {
        const rank = (p: TeamMemberPlayerDTO) => {
            if (p.id === teamCaptainId) return 0;
            switch (p.roster_role) {
                case "starter":
                    return 1;
                case "sub":
                    return 2;
                case "coach":
                    return 3;
                default:
                    return 4;
            }
        };
        return rank(a) - rank(b);
    });
}

function teamHasAnyPlayers(roster: TeamMembersRosterDTO): boolean {
    if (roster.historic_players.length > 0) return true;
    return roster.tournament_rosters.some((t) => t.players.length > 0);
}

function MembersPage() {
    const { team_id } = Route.useParams();
    const { data: teamData } = useTeam(team_id);
    const { data: roster, isLoading } = useTeamMembersRoster(team_id);

    const hasPlayers = roster ? teamHasAnyPlayers(roster) : false;

    return (
        <>
            {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="border-border bg-firstBg flex items-center gap-4 rounded-lg border p-4"
                        >
                            <div className="bg-thirdBg h-12 w-12 animate-pulse rounded-full" />
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="bg-thirdBg h-5 w-32 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-4 w-20 animate-pulse rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : !hasPlayers ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <Users className="text-textSecondary h-10 w-10" />
                    <p className="text-textSecondary">
                        No players on this team
                    </p>
                </div>
            ) : (
                <MembersSections
                    roster={roster!}
                    teamCaptainId={teamData?.team_captain_id}
                    teamId={team_id}
                />
            )}
        </>
    );
}

type RosterSelection = "historic" | number;

function MembersSections({
    roster,
    teamCaptainId,
    teamId,
}: {
    roster: TeamMembersRosterDTO;
    teamCaptainId?: number;
    teamId: string;
}) {
    const defaultSelection = useMemo((): RosterSelection => {
        if (roster.tournament_rosters.length > 0) {
            return roster.tournament_rosters[0].tournament_id;
        }
        return "historic";
    }, [roster]);

    const [selection, setSelection] = useState<RosterSelection | null>(null);

    useEffect(() => {
        setSelection(null);
    }, [teamId]);

    const effectiveSelection = selection ?? defaultSelection;

    const optionCount =
        roster.tournament_rosters.length +
        (roster.historic_players.length > 0 ? 1 : 0);
    const showDropdown = optionCount > 1;

    const displayPlayers = useMemo(() => {
        if (effectiveSelection === "historic") {
            return sortMembers(roster.historic_players, teamCaptainId);
        }
        const tr = roster.tournament_rosters.find(
            (t) => t.tournament_id === effectiveSelection,
        );
        return sortMembers(tr?.players ?? [], teamCaptainId);
    }, [roster, effectiveSelection, teamCaptainId]);

    const selectValue =
        effectiveSelection === "historic"
            ? "historic"
            : String(effectiveSelection);

    return (
        <div className="flex flex-col gap-4">
            {showDropdown && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <select
                        id="members-roster-view"
                        className="border-border bg-firstBg text-textPrimary focus:ring-border max-w-md rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                        value={selectValue}
                        onChange={(e) => {
                            const v = e.target.value;
                            setSelection(
                                v === "historic" ? "historic" : Number(v),
                            );
                        }}
                    >
                        {roster.tournament_rosters.map((t) => (
                            <option
                                key={t.tournament_id}
                                value={String(t.tournament_id)}
                            >
                                {t.tournament_name}
                            </option>
                        ))}
                        {roster.historic_players.length > 0 && (
                            <option value="historic">All-Time Players</option>
                        )}
                    </select>
                </div>
            )}
            {!showDropdown && (
                <h2 className="text-textPrimary text-lg font-semibold">
                    {roster.tournament_rosters.length === 1
                        ? `Roster — ${roster.tournament_rosters[0].tournament_name}`
                        : "Team roster"}
                </h2>
            )}
            {displayPlayers.length === 0 && teamHasAnyPlayers(roster) ? (
                <p className="text-textSecondary py-6 text-sm">
                    No players in this view.
                </p>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                    {displayPlayers.map((player) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            isCaptain={player.id === teamCaptainId}
                            roleForBadges={player.roster_role}
                            matchesPlayed={player.matches_played}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
