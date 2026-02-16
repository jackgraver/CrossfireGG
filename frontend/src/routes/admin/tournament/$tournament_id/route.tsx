import {
    useRefreshMatches,
    useTournamentById,
} from "@/lib/api/tournament.queries";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import TeamsTable from "./teams_comp";

export const Route = createFileRoute("/admin/tournament/$tournament_id")({
    component: RouteComponent,
});

function StageRow({
    stageId,
    name,
    faceitId,
}: {
    stageId: number;
    name: string;
    faceitId: string;
}) {
    const { mutate, isPending } = useRefreshMatches(faceitId, stageId);

    return (
        <div className="bg-secondBg border-border flex items-center justify-between rounded-md border px-4 py-3">
            <h2 className="text-textPrimary text-lg font-semibold">{name}</h2>
            <button
                className="ml-4 rounded bg-blue-600 px-4 py-1 text-white transition hover:bg-blue-700 disabled:opacity-60"
                disabled={isPending}
                onClick={() => mutate()}
            >
                {isPending ? "Refreshing..." : "Refresh matches"}
            </button>
        </div>
    );
}

function RouteComponent() {
    const { tournament_id } = Route.useParams();
    const { data: tournament } = useTournamentById(tournament_id);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-textPrimary text-2xl font-bold">
                {tournament?.name}
            </h1>
            <div className="flex flex-col gap-3">
                {tournament?.stages.map((stage) => (
                    <StageRow
                        key={stage.id}
                        stageId={stage.id}
                        name={stage.name}
                        faceitId={stage.faceit_id}
                    />
                ))}
            </div>
            <TeamsTable tournamentId={tournament?.id ?? 0} />
            <Outlet />
        </div>
    );
}
