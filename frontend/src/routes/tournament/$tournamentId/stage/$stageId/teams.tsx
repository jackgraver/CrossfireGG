import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
    useStageTeams,
    useTournamentById,
} from "@/lib/api/tournament.queries";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { MoveUpRight } from "lucide-react";
import { StageTeamWithTeamDTO } from "@repo/contracts";
import { cn } from "@/utils/cn";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/teams",
)({
    component: TeamsPage,
});

function TeamsPage() {
    const { tournamentId, stageId } = Route.useParams();
    const { data: tournament } = useTournamentById(tournamentId);

    const { data: teams, isLoading } = useStageTeams(stageId, {
        refetchInterval:
            tournament?.syncStatus === "processing" ? 3_000 : undefined,
    });

    const sortedTeams = [...(teams || [])].sort((a, b) => a.seed - b.seed);

    return (
        <div className="rounded-xl shadow-md">
            <div className="py-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading teams...
                    </div>
                ) : teams?.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No teams registered for this stage
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedTeams?.map((team: StageTeamWithTeamDTO) => (
                            <TeamCard key={team.team_id} team={team} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TeamCard({ team }: { team: StageTeamWithTeamDTO }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.team_id.toString() }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="bg-firstBg hover:bg-secondBg flex items-center gap-4 rounded-lg p-4 transition-colors"
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
                    <span className="font-bold text-green-500">
                        {team.wins}W
                    </span>
                    {"-"}
                    <span className="font-bold text-red-500">
                        {team.losses}L
                    </span>
                    {team.seed !== undefined && <span>Seed #{team.seed}</span>}
                </div>
            </div>
            <div
                className={cn(
                    "group rounded-md p-2 transition-all duration-300 ease-out",
                    isHovering ? "opacity-100" : "opacity-0",
                    "hover:bg-thirdBg",
                )}
            >
                <MoveUpRight className="text-textSecondary group-hover:text-textPrimary h-6 w-6 transition-colors" />
            </div>
        </Link>
    );
}
