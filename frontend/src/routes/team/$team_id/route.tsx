import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTeam, useTeamTournaments } from "@/lib/api/team.queries";
import { CalendarDays, Home, Trophy, Users } from "lucide-react";
import TabGroup, { Tab } from "@/components/shared/TabGroup";
import Tile from "@/routes/tournament/$tournamentId/-component/Tile";

export const Route = createFileRoute("/team/$team_id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);
    const { data: tournaments } = useTeamTournaments(team_id);

    const totalWins = tournaments?.reduce(
        (sum, t) =>
            sum +
            t.stages.reduce(
                (s, st) =>
                    s + st.stageTeams.reduce((w, st2) => w + (st2.wins ?? 0), 0),
                0,
            ),
        0,
    ) ?? 0;
    const totalLosses = tournaments?.reduce(
        (sum, t) =>
            sum +
            t.stages.reduce(
                (s, st) =>
                    s + st.stageTeams.reduce((l, st2) => l + (st2.losses ?? 0), 0),
                0,
            ),
        0,
    ) ?? 0;

    if (isLoading) {
        return (
            <div className="mx-auto min-h-screen max-w-350 py-5">
                <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                    <div className="flex items-center gap-6 p-6">
                        <div className="bg-thirdBg h-24 w-24 animate-pulse rounded-full" />
                        <div className="flex flex-col gap-2">
                            <div className="bg-thirdBg h-10 w-56 animate-pulse rounded-md" />
                            <div className="bg-thirdBg h-4 w-32 animate-pulse rounded-md" />
                        </div>
                    </div>
                    <div className="flex gap-2 px-6 pb-4">
                        <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                        <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                        <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-thirdBg h-10 w-64 animate-pulse rounded-md" />
                    <div className="bg-thirdBg h-32 w-full animate-pulse rounded-xl" />
                    <div className="bg-thirdBg h-32 w-full animate-pulse rounded-xl" />
                </div>
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
        <div className="mx-auto min-h-screen max-w-350 py-5">
            <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                <div className="flex items-center gap-6 p-6">
                    <TeamLogo
                        team={team}
                        styling="h-24 w-24 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="text-textPrimary text-4xl font-bold">
                            {team.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            {tournaments && tournaments.length > 0 && (
                                <Tile
                                    bg="bg-blue-500/20"
                                    text="text-blue-400"
                                    icon={Trophy}
                                    label={`${tournaments.length} Tournament${tournaments.length !== 1 ? "s" : ""}`}
                                />
                            )}
                            {(totalWins > 0 || totalLosses > 0) && (
                                <Tile
                                    bg="bg-green-500/20"
                                    text="text-green-400"
                                    icon={CalendarDays}
                                    label={`${totalWins}W - ${totalLosses}L`}
                                />
                            )}
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
                <div className="pb-4">
                    <TabGroup tabs={tabs} />
                </div>
            </div>
            <Outlet />
        </div>
    );
}
