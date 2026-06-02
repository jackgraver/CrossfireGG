import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTeam } from "@/lib/api/team.queries";
import AchievementTilesRow, {
    type AchievementTileItem,
} from "@/routes/team/$team_id/-components/AchievementTilesRow";
import {
    achievementPlacementFromSummaryLabel,
    achievementTileClassesForPlacement,
} from "@/utils/placement";
import { CalendarDays, ExternalLinkIcon, Home, Medal, Users } from "lucide-react";
import TabGroup, { Tab } from "@/components/shared/TabGroup";
import { openInNewTab } from "@/utils/openInNewTab";

function placementSummariesToTileItems(summaries: string[]): AchievementTileItem[] {
    return summaries.map((label) => {
        const p = achievementPlacementFromSummaryLabel(label);
        const { bg, text } = p
            ? achievementTileClassesForPlacement(p)
            : {
                  bg: "bg-gray-500/10",
                  text: "text-textSecondary",
              };
        return { icon: Medal, label, bg, text };
    });
}

export const Route = createFileRoute("/team/$team_id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);

    if (isLoading) {
        return (
            <div className="mx-auto min-h-screen max-w-350 px-4 py-5 md:px-6">
                <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                    <div className="flex flex-col gap-4 py-6">
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                            <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                            <div className="bg-thirdBg h-9 w-28 animate-pulse rounded-md" />
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="bg-thirdBg h-24 w-24 shrink-0 animate-pulse rounded-full" />
                            <div className="flex min-w-0 flex-col gap-2">
                                <div className="bg-thirdBg h-10 w-full max-w-56 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-4 w-32 animate-pulse rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-thirdBg h-10 w-full max-w-64 animate-pulse rounded-md" />
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
                    <h1 className="text-textPrimary mb-4 text-2xl font-bold">Team Not Found</h1>
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
            nav: { to: "/team/$team_id/matches" },
            label: "Matches",
            preload: true,
            icon: CalendarDays,
            exact: false,
        },
        {
            nav: { to: "/team/$team_id/members" },
            label: "Members",
            preload: true,
            icon: Users,
            exact: false,
        },
    ];

    const achievementItems = placementSummariesToTileItems(team.placement_summaries ?? []);

    return (
        <div className="mx-auto min-h-screen max-w-350 px-4 py-5 md:px-6">
            <div className="mb-6 overflow-hidden rounded-xl shadow-md">
                <div className="flex flex-col gap-4 py-6">
                    {achievementItems.length > 0 && (
                        <AchievementTilesRow items={achievementItems} />
                    )}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                            <TeamLogo
                                team={team}
                                styling="h-16 w-16 sm:h-24 sm:w-24 shrink-0 rounded-full object-cover"
                            />
                            <h1 className="text-textPrimary text-2xl font-bold sm:text-4xl">
                                {team.name}
                            </h1>
                        </div>
                        {team.faceit_id && (
                            <button
                                className="bg-faceit/10 text-faceit hover:bg-faceit/20 flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm"
                                onClick={() =>
                                    openInNewTab(
                                        `https://www.faceit.com/en/teams/${team.faceit_id}`,
                                    )
                                }
                            >
                                <ExternalLinkIcon className="h-4 w-4" />
                                <span className="hidden sm:inline">View on Faceit</span>
                            </button>
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
