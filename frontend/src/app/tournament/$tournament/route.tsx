import {
    createFileRoute,
    Link,
    Outlet,
    useMatchRoute,
} from "@tanstack/react-router";
import { useTournament } from "../-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";

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
        { to: "/tournament/$tournament", label: "Overview", exact: true },
        {
            to: "/tournament/$tournament/bracket",
            label: "Bracket",
            exact: false,
        },
        {
            to: "/tournament/$tournament/standings",
            label: "Standings",
            exact: false,
        },
        { to: "/tournament/$tournament/teams", label: "Teams", exact: false },
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
        <div className="mx-auto min-h-screen max-w-[1400px] p-5">
            <div className="bg-firstBg mb-6 overflow-hidden rounded-xl shadow-md">
                <div className="p-6">
                    <h1 className="text-textPrimary mb-2 text-3xl font-bold">
                        {tournament.name}
                    </h1>
                    <div className="text-textSecondary flex flex-wrap gap-4 text-sm">
                        {tournament.start_date && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-medium">Start:</span>
                                <span>
                                    {formatDateOnly(
                                        toUnixTimestamp(tournament.start_date)!,
                                    )}
                                </span>
                            </div>
                        )}
                        {tournament.end_date && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-medium">End:</span>
                                <span>
                                    {formatDateOnly(
                                        toUnixTimestamp(tournament.end_date)!,
                                    )}
                                </span>
                            </div>
                        )}
                        {currentStage && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-medium">Teams:</span>
                                <span>
                                    {currentStage.teams_count ?? 0}/
                                    {currentStage.max_teams}
                                </span>
                            </div>
                        )}
                        {currentStage && (
                            <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                                {currentStage.name}
                            </span>
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
                                params={{ tournament: tournamentId }}
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
