import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTeam } from "@/lib/api/team.queries";
import { CalendarDays, Home, Users } from "lucide-react";
import TabGroup, { Tab } from "@/components/shared/TabGroup";

export const Route = createFileRoute("/team/$team_id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading team...</div>
            </div>
        );
    }

    if (error || !team) {
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

    const tabs: Tab[] = [
        {
            nav: { to: "/team/$team_id" },
            label: "Overview",
            preload: true,
            icon: Home,
            exact: true,
        },
        {
            nav: { to: "/team/$team_id/members" },
            label: "Members",
            preload: true,
            icon: Users,
            exact: false,
        },
        {
            nav: { to: "/team/$team_id/matches" },
            label: "Matches",
            preload: true,
            icon: CalendarDays,
            exact: false,
        },
    ] as const;

    return (
        <div className="min-h-screen py-5">
            <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                <div className="flex items-center gap-6 p-6">
                    <TeamLogo
                        team={team}
                        styling="h-24 w-24 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-2">
                            <h1 className="text-textPrimary text-4xl font-bold">
                                {team.name}
                            </h1>
                            <span className="flex justify-center text-2xl">
                                🇺🇸
                            </span>
                        </div>
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
                {/*<div className="flex flex-col justify-between gap-6 border-b border-white sm:flex-row sm:items-center">
                    <div className="flex gap-10">*/}
                {/*{tabs.map((tab) => (
                            <Link
                                key={tab.to}
                                to={tab.to}
                                // params={{ tournamentId, stageId }}
                                className={cn(
                                    "relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all",
                                    isActiveTab(tab.to, tab.exact)
                                        ? "text-textPrimary"
                                        : "text-textSecondary hover:text-textPrimary",
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </Link>
                        ))}*/}
                <div className="pb-4">
                    <TabGroup tabs={tabs} />
                </div>

                {/*</div>
                </div>*/}
            </div>
            <Outlet />
        </div>
    );
}
