import type { TeamDTO } from "@repo/contracts";
import TeamLogo from "../atoms/TeamLogo";
import { cn } from "@/utils/cn";

export function MatchTeam({
    team,
    winner,
    score,
}: {
    team: TeamDTO | undefined;
    winner?: boolean;
    score?: number;
}) {
    const bg = winner === undefined ? "" : winner ? "bg-[#378a37] " : "";

    return (
        <div
            className={cn(
                !team ? "min-w-32" : "min-w-60",
                "grid grid-cols-[auto_1fr_auto] items-center gap-x-3 px-2 py-1",
                bg,
            )}
        >
            <div className="h-6 w-6 shrink-0">
                <TeamLogo team={team} styling="h-6 w-6 rounded object-cover" />
            </div>
            <div className="min-w-0 text-left">
                <span
                    className="block truncate text-sm font-semibold"
                    title={team?.name}
                >
                    {team?.name}
                </span>
            </div>
            <div className="w-8 shrink-0 text-right">
                <span className="text-sm font-medium">{score ?? "0"}</span>
            </div>
        </div>
    );
}
