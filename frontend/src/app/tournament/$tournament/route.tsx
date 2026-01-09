import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";
import { useTournament } from "../-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import { Calendar, Clock, LayoutDashboard, Trophy, Users } from "lucide-react";

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

export const Route = createFileRoute("/tournament/$tournament")({
    component: RouteComponent,
});

function RouteComponent() {
    const { tournament: tournamentId } = Route.useParams();
    const { data: tournament, isLoading, error } = useTournament(tournamentId);
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
            to: "/tournament/$tournament/bracket",
            label: "Bracket",
            icon: LayoutDashboard,
            exact: false,
        },
        {
            to: "/tournament/$tournament/standings",
            label: "Standings",
            icon: Trophy,
            exact: false,
        },
        {
            to: "/tournament/$tournament/teams",
            label: "Teams",
            icon: Users,
            exact: false,
        },
    ] as const;

    const isActiveTab = (to: string, exact: boolean) => {
        if (exact) {
            return (
                matchRoute({ to, params: { tournament: tournamentId } }) !==
                false
            );
        }
        return (
            matchRoute({
                to,
                params: { tournament: tournamentId },
                fuzzy: true,
            }) !== false
        );
    };

    const currentStage =
        tournament.stages.find((s) => s.is_current) || tournament.stages[0];

    return (
        <div className="mx-auto min-h-screen max-w-[1400px] p-6">
            <div className="border-border/40 relative overflow-hidden border-b pt-8 pb-12 md:pt-12 md:pb-16">
                <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-cfRed rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                                {tournament.stages.find((s) => s.is_current)
                                    ?.name || "Ongoing"}
                            </span>
                            <span className="text-textSecondary flex items-center gap-1.5 text-xs font-medium">
                                <Clock size={14} className="opacity-50" />
                                {tournament.start_date
                                    ? formatDateOnly(
                                          toUnixTimestamp(
                                              tournament.start_date,
                                          )!,
                                      )
                                    : "TBD"}
                            </span>
                        </div>
                        <h1 className="text-textPrimary text-5xl font-black tracking-tight md:text-6xl">
                            {tournament.name}
                        </h1>

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
                                icon={Users}
                                label="Teams"
                                value={
                                    currentStage
                                        ? `${currentStage.teams_count ?? 0} / ${currentStage.max_teams}`
                                        : "N/A"
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-8">
                    <div className="border-border/20 flex flex-col justify-between gap-6 border-b sm:flex-row sm:items-center">
                        <div className="flex gap-10">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.to}
                                    to={tab.to}
                                    params={{ tournament: tournamentId }}
                                    className={`relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all ${
                                        isActiveTab(tab.to, tab.exact)
                                            ? "text-textPrimary"
                                            : "text-textSecondary hover:text-textPrimary"
                                    }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </Link>
                            ))}
                        </div>
                        {tournament.stages.length > 1 && (
                            <div className="bg-secondBg/50 flex items-center gap-1.5 rounded-xl p-1.5">
                                {tournament.stages.map((stage) => (
                                    <button
                                        key={stage.ID}
                                        onClick={() => {}}
                                        className={`rounded-lg px-4 py-2 text-[11px] font-black tracking-wider uppercase transition-all ${
                                            currentStage?.ID === stage.ID
                                                ? "bg-cfRed text-white"
                                                : "text-textSecondary hover:bg-thirdBg"
                                        }`}
                                    >
                                        {stage.name}
                                    </button>
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
// {
//     tabs.map(({ to, label, exact }) => {
//         const active = isActiveTab(to, exact);
//         return (
//             <Link
//                 key={to}
//                 to={to}
//                 params={{ tournament: tournamentId }}
//                 className={`relative px-6 py-3 text-sm font-medium transition-colors ${
//                     active
//                         ? "text-textPrimary"
//                         : "text-textSecondary hover:text-textPrimary"
//                 }`}
//             >
//                 {label}
//                 {active && (
//                     <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500" />
//                 )}
//             </Link>
//         );
//     });
// }
