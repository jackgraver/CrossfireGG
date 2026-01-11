import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
    useTournament,
    useStageTeams,
    useStageStandings,
} from "./-queries/tournamentQueries";
import OSSTable from "@/shared/OSSTable";
import { StageTeam, Team } from "@repo/contracts";
import { StageTeamWithTeam } from "@repo/types";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/standings",
)({
    component: StandingsPage,
});

function StandingsPage() {
    const { tournamentId, stageId } = Route.useParams();
    const {
        data: stageTeams,
        isLoading,
        error,
    } = useStageStandings(Number(stageId));

    if (error) {
        return <div>Error loading standings</div>;
    }

    if (isLoading) {
        return <div>Loading standings...</div>;
    }

    const groups = stageTeams || [];

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
            <div className="border-border flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Standings
                </h2>
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
                                key={group.ID}
                                groupName={group.name}
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
    teams: StageTeamWithTeam[];
}) {
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.losses - b.losses;
    });

    const tableData = sortedTeams.map((t, index) => ({
        rank: index + 1,
        team_name: t.team.name,
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
