import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTournament, useStageTeams } from "../-queries/tournamentQueries";
import type { GroupTeam } from "../-api/tournamentApi";
import OSSTable from "@/shared/OSSTable";

export const Route = createFileRoute("/tournament/$tournament/standings")({
    component: StandingsPage,
});

function StandingsPage() {
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

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Standings
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
                        Loading standings...
                    </div>
                ) : groups.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No standings data available for this stage
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {groups.map((group) => (
                            <GroupStandings
                                key={group.group_id}
                                groupName={group.group_name}
                                teams={group.teams}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function GroupStandings({
    groupName,
    teams,
}: {
    groupName: string;
    teams: GroupTeam[];
}) {
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.losses - b.losses;
    });

    const tableData = sortedTeams.map((t, index) => ({
        rank: index + 1,
        team_name: t.team_name,
        wins: t.wins,
        losses: t.losses,
        record: `${t.wins}-${t.losses}`,
    }));

    return (
        <div>
            <h3 className="text-textPrimary mb-3 font-medium">{groupName}</h3>
            <OSSTable
                data={tableData}
                columns={[
                    { header: "#", accessor: "rank" },
                    { header: "Team", accessor: "team_name" },
                    { header: "W", accessor: "wins" },
                    { header: "L", accessor: "losses" },
                ]}
            />
        </div>
    );
}
