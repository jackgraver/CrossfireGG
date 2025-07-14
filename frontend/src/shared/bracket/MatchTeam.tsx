import type { Team } from "../../types/Types";
import TeamLogo from "./TeamLogo";

export function MatchTeam({
    team,
    winner,
    score,
}: {
    team: Team | undefined;
    winner?: boolean;
    score?: number;
}) {
    const bg = winner === undefined ? "" : winner ? "bg-[#378a37] " : "";

    return (
        <div
            className={`${
                !team && "min-w-64"
            } grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-3 rounded-md px-2 py-1 ${bg}`}
        >
            <div className="h-6 w-6 flex-shrink-0">
                <TeamLogo team={team} styling="h-6 w-6 rounded object-cover" />
            </div>
            <div className="w-6 flex-shrink-0 text-left">
                <span className="text-sm">{team?.seed}</span>
            </div>
            <div className="min-w-0 text-left">
                <span
                    className="block truncate text-sm"
                    title={team?.team_name}
                >
                    {team?.team_name}
                </span>
            </div>
            {score !== undefined && (
                <div className="w-8 flex-shrink-0 text-right">
                    <span className="text-sm font-medium">{score}</span>
                </div>
            )}
        </div>
    );
}
