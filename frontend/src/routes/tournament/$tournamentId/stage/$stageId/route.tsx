import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";
import { useTournamentById } from "../../../../../lib/api/tournament.queries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/date.utils";
import {
    Calendar,
    LayoutDashboard,
    Users,
    Trophy,
    ShieldCheck,
    CheckCircle2,
    DollarSign,
    Clock,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { InfoTile } from "../../-component/InfoTile";
import Tile from "../../-component/Tile";

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
    const matchRoute = useMatchRoute();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading tournament...</div>
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

    const tabs = [
        {
            to: "/tournament/$tournamentId/stage/$stageId/bracket",
            label: "Bracket",
            icon: LayoutDashboard,
            exact: false,
        },
        {
            to: "/tournament/$tournamentId/stage/$stageId/teams",
            label: "Teams",
            icon: Users,
            exact: false,
        },
    ] as const;

    const isActiveTab = (to: string, exact: boolean) => {
        if (exact) {
            return (
                matchRoute({ to, params: { tournamentId, stageId } }) !== false
            );
        }
        return (
            matchRoute({
                to,
                params: { tournamentId, stageId },
                fuzzy: true,
            }) !== false
        );
    };

    return (
        <div className="mx-auto min-h-screen max-w-350">
            <div className="relative overflow-hidden pt-8 pb-8 md:pb-8">
                <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div className="space-y-6">
                        <div className="m-0 flex items-center gap-2">
                            <Tile
                                color="gray-500"
                                icon={Clock}
                                label={tournament.status.toUpperCase()}
                                fade={40}
                            />

                            <Tile
                                color="green-500"
                                icon={DollarSign}
                                label={tournament.prize_pool?.toString() ?? "0"}
                                fade={20}
                            />
                            {tournament.is_vrs_enabled && (
                                <Tile
                                    color="blue-500"
                                    icon={CheckCircle2}
                                    label={"VRS Enabled"}
                                    fade={20}
                                />
                            )}
                        </div>

                        <h1 className="text-textPrimary mb-2 pt-2 text-5xl font-black tracking-tight md:text-6xl">
                            {tournament.name}
                        </h1>
                        {/*{tournament.status === "upcoming" && (
                            <SignUpButton tournamentId={tournamentId} />
                        )}*/}
                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <div className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-dashed border-white/10 px-4 py-2">
                                <div className="bg-cfRed/10 flex h-10 w-10 items-center justify-center rounded-lg">
                                    <Calendar
                                        className="text-cfRed"
                                        size={24}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
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
                <div className="mt-8 space-y-8">
                    <div className="flex flex-col justify-between gap-6 border-b border-white sm:flex-row sm:items-center">
                        <div className="flex gap-10">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.to}
                                    to={tab.to}
                                    params={{ tournamentId, stageId }}
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
                            ))}
                        </div>
                        {tournament.stages.length > 1 && (
                            <div className="flex gap-10">
                                {tournament.stages.map((stage) => (
                                    <Link
                                        key={stage.id}
                                        to="."
                                        params={(prev: any) => ({
                                            ...prev,
                                            stageId: stage.id,
                                        })}
                                        className={`relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all ${
                                            stageId === stage.id.toString()
                                                ? "text-textPrimary"
                                                : "text-textSecondary hover:text-textPrimary"
                                        }`}
                                    >
                                        {stage.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
