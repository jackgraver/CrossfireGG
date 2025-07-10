import type { Team } from "../types/Types";
import OSSTable from "./OSSTable";

const rowBgColor = (row: Team) => {
    if (row.win >= 3) {
        return "bg-[#378a37]";
    } else if (row.loss >= 3) {
        return "bg-red-500";
    }
    return "";
};

type StandingsProps = {
    teams: Team[];
};

export default function Standings({ teams }: StandingsProps) {
    const qualifiedTeams = teams.filter((team) => team.win >= 3);
    const eliminatedTeams = teams.filter((team) => team.loss >= 3);
    const restTeams = teams.filter((team) => team.win < 3 && team.loss < 3);

    return (
        <div className="flex flex-row gap-x-32 pt-8">
            {eliminatedTeams.length > 0 && (
                <div className="flex flex-col gap-y-4 text-center">
                    <h1 className="text-4xl text-red-400">Eliminated</h1>
                    <OSSTable
                        data={eliminatedTeams
                            .sort((a, b) => {
                                if (b.win !== a.win) {
                                    return b.win - a.win;
                                }
                                return a.loss - b.loss;
                            })
                            .map((t, index) => ({
                                ...t,
                                rank: index + 1,
                                record: `${t.win}-${t.loss}`,
                                matches: t.win + t.loss,
                            }))}
                        columns={[
                            { header: "", accessor: "rank" },
                            { header: "Team", accessor: "team_name" },
                            { header: "Matches", accessor: "matches" },
                            { header: "Record", accessor: "record" },
                        ]}
                    />
                </div>
            )}

            {restTeams.length > 0 && (
                <div className="flex flex-col gap-y-4 text-center">
                    <h1 className="text-4xl">Remaining Teams</h1>
                    <OSSTable
                        data={restTeams
                            .sort((a, b) => {
                                if (b.win !== a.win) {
                                    return b.win - a.win;
                                }
                                return a.loss - b.loss;
                            })
                            .map((t, index) => ({
                                ...t,
                                rank: index + 1,
                                record: `${t.win}-${t.loss}`,
                                matches: t.win + t.loss,
                            }))}
                        columns={[
                            { header: "", accessor: "rank" },
                            { header: "Team", accessor: "team_name" },
                            { header: "Matches", accessor: "matches" },
                            { header: "Record", accessor: "record" },
                        ]}
                    />
                </div>
            )}

            {qualifiedTeams.length > 0 && (
                <div className="flex flex-col gap-y-4 text-center">
                    <h1 className="text-4xl text-green-400">Qualified</h1>
                    <OSSTable
                        data={qualifiedTeams
                            .sort((a, b) => {
                                if (b.win !== a.win) {
                                    return b.win - a.win;
                                }
                                return a.loss - b.loss;
                            })
                            .map((t, index) => ({
                                ...t,
                                rank: index + 1,
                                record: `${t.win}-${t.loss}`,
                                matches: t.win + t.loss,
                            }))}
                        columns={[
                            { header: "", accessor: "rank" },
                            { header: "Team", accessor: "team_name" },
                            { header: "Matches", accessor: "matches" },
                            { header: "Record", accessor: "record" },
                        ]}
                    />
                </div>
            )}
        </div>
    );
}
