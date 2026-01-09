import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTournament, useStageTeams } from "../-queries/tournamentQueries";
import type { GroupTeam } from "../-api/tournamentApi";

export const Route = createFileRoute("/tournament/$tournament/teams")({
    component: TeamsPage,
});

function TeamsPage() {
    const { tournament: tournamentId } = Route.useParams();
    const { data: tournament } = useTournament(tournamentId);
    const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

    const stages = tournament?.stages || [];

    useEffect(() => {
        if (stages.length > 0 && selectedStageId === null) {
            const currentStage = stages.find((s) => s.is_current) || stages[0];
            setSelectedStageId(currentStage.ID);
        }
    }, [stages, selectedStageId]);

    const { data: stageTeamsData, isLoading } = useStageTeams(selectedStageId);

    const groups = stageTeamsData?.groups || [];
    const allTeams = groups.flatMap((g) => g.teams);

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Teams
                </h2>
                {stages.length > 0 && (
                    <select
                        value={selectedStageId ?? ""}
                        onChange={(e) =>
                            setSelectedStageId(Number(e.target.value))
                        }
                        className="border-border bg-secondBg text-textPrimary rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                        {stages.map((stage) => (
                            <option key={stage.ID} value={stage.ID}>
                                {stage.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="p-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading teams...
                    </div>
                ) : allTeams.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No teams registered for this stage
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {allTeams.map((team) => (
                            <TeamCard key={team.team_id} team={team} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TeamCard({ team }: { team: GroupTeam }) {
    return (
        <Link
            to="/team/$team_id"
            params={{ team_id: team.team_id.toString() }}
            className="border-border bg-secondBg hover:bg-thirdBg flex items-center gap-4 rounded-lg border p-4 transition-colors"
        >
            {team.team_logo ? (
                <img
                    src={team.team_logo}
                    alt={team.team_name}
                    className="h-12 w-12 rounded-lg object-cover"
                />
            ) : (
                <div className="bg-thirdBg text-textSecondary flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold">
                    {team.team_name.charAt(0).toUpperCase()}
                </div>
            )}
            <div className="min-w-0 flex-1">
                <div className="text-textPrimary truncate font-semibold">
                    {team.team_name}
                </div>
                <div className="text-textSecondary mt-0.5 flex gap-3 text-sm">
                    <span>
                        {team.wins}W - {team.losses}L
                    </span>
                    {team.seed > 0 && <span>Seed #{team.seed}</span>}
                </div>
            </div>
        </Link>
    );
}
