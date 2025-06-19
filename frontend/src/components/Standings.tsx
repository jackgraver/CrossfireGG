import type { Team } from "../types/Types";

// const rowBorder = (win: number, loss: number) => {
//     if (win >= 3) {
//         return "bg-[#378a37]"; // "border border-green-400";
//     } else if (loss >= 3) {
//         return "bg-red-500"; //"border border-red-400";
//     }
//     return "";
// };

const rowBgColor = (win: number, loss: number, i: number) => {
    if (win >= 3) {
        return "bg-[#378a37]"; // "border border-green-400";
    } else if (loss >= 3) {
        return "bg-red-500"; //"border border-red-400";
    }
    return i % 2 === 0 ? "bg-gray-800" : "bg-gray-600";
};

type StandingsProps = {
    teams: Team[];
};

export default function Standings({ teams }: StandingsProps) {
    return (
        <table className="bg-gray-800 text-white mt-2">
            <thead>
                <tr>
                    <th></th>
                    <th>Team</th>
                    <th>Matches</th>
                    <th>Record</th>
                </tr>
            </thead>

            <tbody>
                {teams
                    .sort((a, b) => {
                        // First sort by wins (descending)
                        if (b.win !== a.win) {
                            return b.win - a.win;
                        }
                        // If wins are equal, sort by losses (ascending)
                        return a.loss - b.loss;
                    })
                    .map((t, i) => (
                        <tr
                            key={i}
                            className={`text-center
                                ${rowBgColor(t.win, t.loss, i)}
                                `}
                        >
                            <td className="p-2 w-8">{i + 1}</td>
                            <td className="w-32">{t.team_name}</td>
                            <td className="w-28">{t.win + t.loss}</td>
                            <td className="w-28">{`${t.win}-${t.loss}`}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
