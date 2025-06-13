import type { Match } from "../../types/Types";

type MatchCardProps = {
    match: Match | undefined;
};

export default function MatchCard({ match }: MatchCardProps) {
    let team1 = "?";
    let team2 = "?";
    if (match) {
        team1 = match.teams.team1.team_name;
        team2 = match.teams.team2.team_name;
    }

    return (
        <div className="flex flex-row p-2">
            <TeamIcon
                name={team1}
                winner={
                    match
                        ? match?.winner === match?.teams.team1.team_id
                        : undefined
                }
            />
            vs
            <TeamIcon
                name={team2}
                winner={
                    match
                        ? match?.winner === match?.teams.team2.team_id
                        : undefined
                }
            />
        </div>
    );
}

function TeamIcon({ name, winner }: { name: string; winner?: boolean }) {
    // const letter = name?.charAt(0).toUpperCase();
    const letter = name ? name : "-";

    return (
        <div
            className={`rounded-4xl w-8 bg-gray-400 text-center p-1 m-1
        ${
            winner === undefined
                ? ""
                : winner
                ? "border border-green-300"
                : "border border-red-300"
        }`}
        >
            <span>{letter}</span>
        </div>
    );
}
