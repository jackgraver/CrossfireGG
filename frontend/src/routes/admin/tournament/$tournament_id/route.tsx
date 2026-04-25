import {
    useRefreshMatches,
    useRefreshTeams,
    useSetCurrentStage,
    useTournamentById,
} from "@/lib/api/tournament.queries";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Loader2, Radio, RefreshCcw, Users } from "lucide-react";
import TeamsTable from "./-teams_comp";

export const Route = createFileRoute("/admin/tournament/$tournament_id")({
    component: RouteComponent,
});

function StageRow({
    stageId,
    name,
    faceitId,
    isCurrent,
    tournamentId,
}: {
    stageId: number;
    name: string;
    faceitId: string;
    isCurrent: boolean;
    tournamentId: string;
}) {
    const { mutate: refreshMatches, isPending: isRefreshingMatches } = useRefreshMatches(
        faceitId,
        stageId,
    );
    const { mutate: refreshTeams, isPending: isRefreshingTeams } = useRefreshTeams();
    const { mutate: setCurrent, isPending: isSettingCurrent } = useSetCurrentStage(tournamentId);

    const handleToggleCurrent = () => {
        setCurrent({ stageId: isCurrent ? null : stageId });
    };

    return (
        <div
            className={`bg-secondBg flex items-center justify-between gap-4 rounded-lg border px-4 py-3 transition-colors ${
                isCurrent
                    ? "border-cfRed/40 shadow-cfRed/5 shadow-md"
                    : "border-border hover:border-textSecondary/30"
            }`}
        >
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    role="switch"
                    aria-checked={isCurrent}
                    aria-label={isCurrent ? "Unmark as current stage" : "Mark as current stage"}
                    title={isCurrent ? "Unmark as current stage" : "Mark as current stage"}
                    onClick={handleToggleCurrent}
                    disabled={isSettingCurrent}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        isCurrent ? "bg-cfRed" : "bg-thirdBg"
                    }`}
                >
                    <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                            isCurrent ? "translate-x-[22px]" : "translate-x-[2px]"
                        }`}
                    />
                </button>
                <div className="flex min-w-0 flex-col">
                    <div className="flex items-center gap-2">
                        <h2 className="text-textPrimary truncate text-lg font-semibold">{name}</h2>
                        {isCurrent && (
                            <span className="bg-cfRed/10 text-cfRed border-cfRed/30 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                                <Radio size={10} />
                                Live
                            </span>
                        )}
                    </div>
                    <span className="text-textSecondary/70 text-xs">
                        {isCurrent
                            ? "This stage is the current live stage"
                            : "Toggle to set as current live stage"}
                    </span>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    disabled={isRefreshingTeams}
                    onClick={() =>
                        refreshTeams({ faceitId: faceitId, tournamentId: stageId })
                    }
                    className="border-border text-textPrimary hover:border-textSecondary/40 hover:bg-thirdBg/40 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isRefreshingTeams ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <Users size={14} />
                    )}
                    {isRefreshingTeams ? "Fetching" : "Fetch Teams"}
                </button>
                <button
                    type="button"
                    disabled={isRefreshingMatches}
                    onClick={() => refreshMatches()}
                    className="border-border text-textPrimary hover:border-textSecondary/40 hover:bg-thirdBg/40 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isRefreshingMatches ? (
                        <Loader2 size={14} className="animate-spin" />
                    ) : (
                        <RefreshCcw size={14} />
                    )}
                    {isRefreshingMatches ? "Refreshing" : "Refresh Matches"}
                </button>
            </div>
        </div>
    );
}

function RouteComponent() {
    const { tournament_id } = Route.useParams();
    const { data: tournament } = useTournamentById(tournament_id);

    return (
        <div className="flex min-h-screen flex-col gap-4">
            <h1 className="text-textPrimary text-2xl font-bold">{tournament?.name}</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-textSecondary text-sm font-medium tracking-wider uppercase">
                    Stages
                </h2>
                <div className="flex flex-col gap-2">
                    {tournament?.stages.map((stage) => (
                        <StageRow
                            key={stage.id}
                            stageId={stage.id}
                            name={stage.name}
                            faceitId={stage.faceit_id}
                            isCurrent={stage.is_current}
                            tournamentId={tournament_id}
                        />
                    ))}
                </div>
                <p className="text-textSecondary/70 text-xs">
                    Only one stage per tournament can be marked as current at a time.
                </p>
            </div>
            <TeamsTable tournamentId={tournament?.id ?? 0} />
            <Outlet />
        </div>
    );
}
