import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTournamentById } from "@/lib/api/tournament.queries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/date.utils";
import {
    Calendar,
    LayoutDashboard,
    Users,
    CheckCircle2,
    DollarSign,
    Clock,
    ExternalLinkIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { InfoTile } from "../../-component/InfoTile";
import Tile from "../../-component/Tile";
import TabGroup, { Tab } from "@/components/shared/TabGroup";
import { openInNewTab } from "@/utils/openInNewTab";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId",
)({
    component: RouteComponent,
});

function RouteComponent() {
    const { tournamentId, stageId } = Route.useParams();
    const {
        data: tournament,
        isLoading,
        error,
    } = useTournamentById(tournamentId);

    if (isLoading) {
        return (
            <div className="mx-auto min-h-screen max-w-350 px-6 md:px-0">
                <div className="relative overflow-hidden pt-8 pb-8 md:pb-8">
                    <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="space-y-6">
                            <div className="m-0 flex flex-wrap items-center gap-2">
                                <div className="bg-thirdBg h-6 w-full max-w-64 animate-pulse rounded-md" />
                            </div>
                            <div className="space-y-2 pt-2">
                                <div className="bg-thirdBg h-16 w-full max-w-130 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-19 w-full max-w-90 animate-pulse rounded-md" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-8">
                        <div className="flex flex-col justify-between gap-6 border-b border-white sm:flex-row sm:items-center">
                            <div className="flex gap-10">
                                <div className="relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all">
                                    <LayoutDashboard size={18} />
                                    Bracket
                                </div>
                                <div className="relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all">
                                    <Users size={18} />
                                    Teams
                                </div>
                            </div>
                            <div className="bg-thirdBg h-9 w-35 animate-pulse rounded-md pb-4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !tournament) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                    <h1 className="text-textPrimary mb-4 text-2xl font-bold">
                        Tournament Not Found
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
            nav: { to: `/tournament/${tournamentId}/stage/${stageId}/bracket` },
            label: "Bracket",
            preload: true,
            icon: LayoutDashboard,
            exact: false,
        },
        {
            nav: { to: `/tournament/${tournamentId}/stage/${stageId}/teams` },
            label: "Teams",
            preload: true,
            icon: Users,
            exact: false,
        },
    ] as const;

    return (
        <div className="mx-auto min-h-screen max-w-350 px-6 md:px-0">
            <div className="relative overflow-hidden pt-8 pb-8 md:pb-8">
                <div className="relative z-10 flex flex-col justify-between md:flex-row md:items-end lg:gap-8">
                    <div className="flex w-full flex-col space-y-6 xl:flex-row">
                        <div className="flex flex-1 flex-col">
                            <div className="m-0 flex flex-wrap items-center gap-2">
                                <Tile
                                    bg="bg-gray-500/40"
                                    text="text-gray-200"
                                    icon={Clock}
                                    label={tournament.status.toUpperCase()}
                                />
                                <Tile
                                    bg="bg-green-500/20"
                                    text="text-green-400"
                                    icon={DollarSign}
                                    label={
                                        tournament.prize_pool?.toString() ?? "0"
                                    }
                                />
                                {tournament.is_vrs_enabled && (
                                    <Tile
                                        bg="bg-blue-500/20"
                                        text="text-blue-400"
                                        icon={CheckCircle2}
                                        label={"VRS Compliance"}
                                    />
                                )}
                            </div>
                            <h1 className="text-textPrimary pt-2 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl lg:mb-2">
                                {tournament.name}
                            </h1>
                        </div>
                        <div className="flex flex-1 flex-wrap items-center xl:justify-end">
                            <div className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-white/10 px-4 py-2">
                                <div className="bg-cfRed/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg lg:h-10 lg:w-10">
                                    <Calendar className="text-cfRed h-4 w-4 lg:h-6 lg:w-6" />
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <InfoTile
                                        icon={Calendar}
                                        label="Registration"
                                        value={
                                            tournament.start_date
                                                ? formatDateOnly(
                                                      toUnixTimestamp(
                                                          tournament.start_date,
                                                      )!,
                                                  )
                                                : "TBD"
                                        }
                                    />
                                    <InfoTile
                                        icon={Calendar}
                                        label="Start Date"
                                        value={
                                            tournament.start_date
                                                ? formatDateOnly(
                                                      toUnixTimestamp(
                                                          tournament.start_date,
                                                      )!,
                                                  )
                                                : "TBD"
                                        }
                                    />
                                    <InfoTile
                                        icon={Calendar}
                                        label="End Date"
                                        value={
                                            tournament.end_date
                                                ? formatDateOnly(
                                                      toUnixTimestamp(
                                                          tournament.end_date,
                                                      )!,
                                                  )
                                                : "TBD"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full gap-2 overflow-x-auto rounded-2xl py-2">
                    {tournament.stages.map((stage) => {
                        const isActive = stageId === stage.name;
                        return (
                            <div
                                key={stage.id}
                                className={cn(
                                    "flex min-w-fit flex-1 items-center gap-2 rounded-xl p-1 transition-all sm:min-w-50",
                                    isActive
                                        ? "bg-secondBg shadow-sm"
                                        : "bg-firstBg/80 hover:bg-firstBg",
                                )}
                            >
                                <Link
                                    to="."
                                    params={(prev: any) => ({
                                        ...prev,
                                        stageId: stage.id,
                                    })}
                                    className={cn(
                                        "flex flex-1 items-center justify-center py-2.5 text-sm font-bold whitespace-nowrap transition-all",
                                        isActive
                                            ? "text-textPrimary"
                                            : "text-textSecondary hover:text-textPrimary",
                                    )}
                                >
                                    {stage.name}
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openInNewTab(
                                            "https://www.faceit.com/en/championship/" +
                                                stage.faceit_id,
                                        );
                                    }}
                                    className="bg-faceit/10 hover:bg-faceit/20 text-faceit flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                                    title="View on Faceit"
                                >
                                    <ExternalLinkIcon />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8 space-y-8">
                    <TabGroup tabs={tabs} />
                </div>
            </div>
            <Outlet />
        </div>
    );
}
