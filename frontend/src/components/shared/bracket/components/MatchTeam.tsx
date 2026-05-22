import type { TeamDTO } from "@repo/contracts";
import TeamLogo from "../atoms/TeamLogo";
import { cn } from "@/utils/cn";

export function MatchTeam({
    team,
    winner,
    score,
    variant = "default",
    hoveredTeamId,
    onTeamHover,
}: {
    team: TeamDTO | undefined;
    winner?: boolean;
    score?: number;
    /** Fills column width and allows shrinking below min-w-60 (truncate name). */
    variant?: "default" | "bracket";
    hoveredTeamId?: number | null;
    onTeamHover?: (teamId: number | null) => void;
}) {
    const bg = winner === undefined ? "" : winner ? "bg-[#378a37] " : "";
    const isHighlighted = hoveredTeamId != null && team?.id === hoveredTeamId;

    return (
        <div
            data-bracket-team={onTeamHover ? "" : undefined}
            className={cn(
                variant === "bracket" ? "min-w-0 w-full" : !team ? "min-w-32" : "min-w-60",
                "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 px-2 py-1 transition-[box-shadow,background-color] duration-200",
                bg,
                isHighlighted &&
                    "shadow-[inset_0_0_0_2px_rgba(255,255,255,0.5),inset_0_0_10px_rgba(255,255,255,0.15),0_0_10px_rgba(255,255,255,0.12)]",
            )}
            onMouseEnter={() => {
                if (team?.id && onTeamHover) onTeamHover(team.id);
            }}
            onMouseLeave={(e) => {
                if (!onTeamHover) return;
                const related = e.relatedTarget as Element | null;
                if (related?.closest("[data-bracket-team]")) return;
                onTeamHover(null);
            }}
        >
            <div className="h-6 w-6 shrink-0">
                <TeamLogo team={team} styling="h-6 w-6 rounded object-cover" />
            </div>
            <div className="min-w-0 text-left">
                <span className="block truncate text-sm font-semibold" title={team?.name}>
                    {team?.name}
                </span>
            </div>
            <div className="w-8 shrink-0 text-right">
                <span className="text-sm font-medium">{score ?? "0"}</span>
            </div>
        </div>
    );
}
