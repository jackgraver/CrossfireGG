import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTeam } from "../-queries/teamQueries";

export const Route = createFileRoute("/team/$team_id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();
    const { data, isLoading, error } = useTeam(team_id);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error) {
        return <></>;
    }

    if (!data) {
        return <></>;
    }

    const { team, tournaments } = data;

    return (
        <div>
            <div className="flex items-center gap-5">
                <TeamLogo
                    team={team}
                    styling="h-32 w-32 rounded-full border-4 border-border object-cover"
                />
                <div className="flex-1">
                    <div className="mb-4 flex flex-row items-center gap-x-2">
                        <h1 className="text-textPrimary text-3xl font-bold">
                            {team.name || "Tester"}
                        </h1>
                    </div>
                </div>
            </div>
            <div>
                <Link to="/team/$team_id/members" params={{ team_id }}>
                    Members
                </Link>
                <Link to="/team/$team_id/matches" params={{ team_id }}>
                    Matches
                </Link>
            </div>
            <Outlet />
        </div>
    );
}
