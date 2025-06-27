import type { Team } from "../../types/Types";

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
            {/* Logo */}
            <div className="h-6 w-6 flex-shrink-0">
                <img
                    src={team?.team_logo || "OSSLOGO.png"}
                    onError={(e) => {
                        e.currentTarget.onerror = null; // Prevents infinite loop
                        e.currentTarget.src = "/OSSLOGO.png";
                    }}
                    alt="?"
                    className="h-6 w-6 rounded object-cover"
                />
            </div>

            {/* Seed */}
            <div className="w-6 flex-shrink-0 text-left">
                <span className="text-sm">{team?.seed}</span>
            </div>

            {/* Team Name */}
            <div className="min-w-0 text-left">
                <span
                    className="block truncate text-sm"
                    title={team?.team_name}
                >
                    {team?.team_name}
                </span>
            </div>

            {/* Score */}
            {score !== undefined && (
                <div className="w-8 flex-shrink-0 text-right">
                    <span className="text-sm font-medium">{score}</span>
                </div>
            )}
        </div>
    );
}
