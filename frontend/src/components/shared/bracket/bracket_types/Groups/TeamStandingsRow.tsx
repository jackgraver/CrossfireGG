import { MatchParticipantWithTeamDTO } from "@repo/contracts";
import { Link } from "@tanstack/react-router";
import TeamLogo from "../../atoms/TeamLogo";

export default function TeamStandingsRow({
    team,
    index,
}: {
    team: MatchParticipantWithTeamDTO;
    index: number;
}) {
    // Determine if team is in the "Qualification Zone" (top 2 for now, could be dynamic)
    const isQualifying = index < 2;

    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.stageTeam.team.id.toString() }}
            className={`group relative flex items-center gap-3 rounded-md px-3 py-3 transition-all duration-200 hover:bg-white/5 ${isQualifying ? "before:absolute before:top-1 before:bottom-1 before:left-0 before:w-1 before:rounded-full before:bg-green-500" : ""}`}
        >
            <div className="text-textSecondary/50 flex w-6 justify-center text-xs font-bold">
                {index + 1}
            </div>
            <TeamLogo
                team={{
                    id: team.stageTeam.team.id,
                    name: team.stageTeam.team.name,
                    team_logo: team.stageTeam.team.team_logo,
                    faceit_id: team.stageTeam.team.faceit_id || "",
                    team_captain_id: team.stageTeam.team.team_captain_id,
                }}
                styling="h-8 w-8 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-textPrimary truncate text-sm font-semibold transition-colors group-hover:text-white">
                    {team.stageTeam.team.name}
                </span>
                {isQualifying && (
                    <span className="text-[10px] font-bold tracking-wider text-green-500 uppercase">
                        Qualifying
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-textPrimary text-sm font-bold">
                        {team.stageTeam.wins}W - {team.stageTeam.losses}L
                    </span>
                    <span className="text-textSecondary text-[10px] font-medium uppercase">
                        Record
                    </span>
                </div>
            </div>
        </Link>
    );
}
