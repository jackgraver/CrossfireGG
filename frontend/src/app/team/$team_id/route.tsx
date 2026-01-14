import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";
import { useTeam } from "../-queries/team.queries";

export const Route = createFileRoute("/team/$team_id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();
    const { data, isLoading, error } = useTeam(team_id);
    const matchRoute = useMatchRoute();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                    <h1 className="text-textPrimary mb-4 text-2xl font-bold">
                        Team Not Found
                    </h1>
                    <Link to="/" className="text-blue-400 hover:text-blue-300">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const { team } = data;

    const tabs = [
        { to: "/team/$team_id", label: "Overview", exact: true },
        { to: "/team/$team_id/members", label: "Members", exact: false },
        { to: "/team/$team_id/matches", label: "Matches", exact: false },
    ] as const;

    const isActiveTab = (to: string, exact: boolean) => {
        if (exact) {
            return matchRoute({ to, params: { team_id } }) !== false;
        }
        return matchRoute({ to, params: { team_id }, fuzzy: true }) !== false;
    };

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-5">
            <div className="bg-firstBg mb-6 overflow-hidden rounded-xl shadow-md">
                <div className="flex items-center gap-6 p-6">
                    <TeamLogo
                        team={team}
                        styling="h-24 w-24 rounded-lg border-2 border-border object-cover"
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="text-textPrimary text-3xl font-bold">
                            {team.name}
                        </h1>
                        {team.faceit_id && (
                            <a
                                href={`https://www.faceit.com/en/teams/${team.faceit_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-textSecondary text-sm hover:text-blue-400"
                            >
                                View on FACEIT →
                            </a>
                        )}
                    </div>
                </div>
                <div className="border-border flex border-t">
                    {tabs.map(({ to, label, exact }) => {
                        const active = isActiveTab(to, exact);
                        return (
                            <Link
                                key={to}
                                to={to}
                                params={{ team_id }}
                                className={`relative px-6 py-3 text-sm font-medium transition-colors ${
                                    active
                                        ? "text-textPrimary"
                                        : "text-textSecondary hover:text-textPrimary"
                                }`}
                            >
                                {label}
                                {active && (
                                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <Outlet />
        </div>
    );
}
