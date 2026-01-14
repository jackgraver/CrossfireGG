import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStageTeams } from "./-queries/tournament.queries";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { MoveUpRight } from "lucide-react";
import { StageTeamWithTeam } from "@repo/types";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/teams",
)({
    component: TeamsPage,
});

function TeamsPage() {
    const { tournamentId, stageId } = Route.useParams();

    const { data, isLoading } = useStageTeams(Number(stageId));

    console.log(data);

    return (
        <div className="rounded-xl shadow-md">
            {/* <div className="py-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading teams...
                    </div>
                ) : stageTeams?.teams.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No teams registered for this stage
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {stageTeams?.teams.map((team) => (
                            <TeamCard key={team.team_id} team={team} />
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    );
}

function TeamCard({ team }: { team: StageTeamWithTeam }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.team_id.toString() }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="border-border bg-firstBg hover:bg-secondBg flex items-center gap-4 rounded-lg border p-4 transition-colors"
        >
            <TeamLogo
                avatar={team.team.team_logo || undefined}
                styling="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
                <div className="text-textPrimary truncate font-semibold">
                    {team.team.name}
                </div>
                <div className="text-textSecondary mt-0.5 flex gap-3 text-sm">
                    <span>
                        {team.wins}W - {team.losses}L
                    </span>
                    {team.seed > 0 && <span>Seed #{team.seed}</span>}
                </div>
            </div>
            <MoveUpRight
                className={`text-textSecondary h-6 w-6 transition-all duration-300 ease-out ${
                    isHovering ? "opacity-100" : "opacity-0"
                }`}
            />
        </Link>
    );
}
