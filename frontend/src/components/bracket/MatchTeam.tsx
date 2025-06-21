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
        <div className={`flex items-center gap-x-3 px-2 ${bg}`}>
            <img
                src={team?.team_logo || "OSSLOGO.png"}
                onError={(e) => {
                    e.currentTarget.onerror = null; // Prevents infinite loop
                    e.currentTarget.src = "/OSSLOGO.png";
                }}
                alt="?"
                className="w-6 h-6 rounded"
            />

            <div className="min-w-[24px] text-left">
                <span>{team?.seed}</span>
            </div>

            <div className="min-w-[140px] text-left">
                <span>{team?.team_name}</span>
            </div>

            {score && (
                <div className="min-w-[8px] text-left mr-2">
                    <span>{score}</span>
                </div>
            )}
        </div>
    );
}
