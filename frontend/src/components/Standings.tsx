import type { Team } from "../types/Types";
import OSSTable from "./OSSTable";

const rowBgColor = (row: Team) => {
    // console.log(row);
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
    // console.log(teams);
    return (
        <div>
            <OSSTable
                data={teams
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
                rowClassName={(row) => rowBgColor(row)}
            />
        </div>
    );
}
