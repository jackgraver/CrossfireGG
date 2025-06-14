import type { Team } from "../../types/Types";

export function MatchTeam({
    team,
    winner,
}: {
    team: Team | undefined;
    winner?: boolean;
}) {
    const bg = winner === undefined ? "" : winner ? "bg-green-500" : "";

    return (
        <div className={`flex items-center gap-x-3 bg-gray-400 px-2 ${bg}`}>
            <img src="OSSLOGO.png" className="w-6 h-6" alt="?" />

            <div className="min-w-[24px] text-left">
                <span>{team?.seed}</span>
            </div>

            <div className="min-w-[140px] text-left">
                <span>{team?.team_name}</span>
            </div>

            <div className="min-w-[8px] text-left mr-2">
                <span>{0}</span>
            </div>
        </div>
    );
}
