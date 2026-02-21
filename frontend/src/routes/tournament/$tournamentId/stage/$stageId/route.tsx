import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";
import { useTournamentById } from "../../../../../lib/api/tournament.queries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/date.utils";
import { Calendar, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/utils/cn";
import SignUpButton from "@/routes/tournament/-components/SignUpButton";

const InfoTile = ({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) => (
    <div className="flex items-center gap-4 p-2 transition-all">
        <div className="bg-cfRed/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="text-cfRed" size={20} />
        </div>
        <div>
            <p className="text-textSecondary text-[10px] font-bold tracking-widest uppercase">
                {label}
            </p>
            <p className="text-textPrimary text-base font-bold">{value}</p>
        </div>
    </div>
);

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

    const currentStage = tournament.stages[0];

    return (
        <div className="mx-auto min-h-screen max-w-[1400px] p-6">
            <div className="relative overflow-hidden pt-8 pb-8 md:pt-12 md:pb-8">
                <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div className="space-y-6">
                        <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                            Ongoing
                        </span>
                        <h1 className="text-textPrimary mb-2 pt-2 text-5xl font-black tracking-tight md:text-6xl">
                            {tournament.name}
                        </h1>
                        {tournament.status === "upcoming" && (
                            <SignUpButton tournamentId={tournamentId} />
                        )}
                        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-4">
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
                                label="Registration Deadline" //TODO: Change to Registration Deadline
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
                                                  tournament.start_date,
                                              )!,
                                          )
                                        : "TBD"
                                }
                            />
                            {/* <InfoTile
                                icon={Users}
                                label="RegisteredTeams"
                                value={
                                    currentStage
                                        ? `${currentStage.teams_count ?? 0} / ${currentStage.max_teams}`
                                        : "N/A"
                                }
                            /> */}
                            <InfoTile
                                icon={Calendar}
                                label="Prize Pool"
                                value={
                                    tournament.prize_pool
                                        ? formatDateOnly(
                                              toUnixTimestamp(
                                                  tournament.start_date,
                                              )!,
                                          )
                                        : "TBD"
                                }
                            />
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
