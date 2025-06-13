import type { Match } from "../types/Types";

type BracketProps = {
    title: string;
    matches: Match[];
};

export default function Section({ title, matches }: BracketProps) {
    return (
        <div className="min-w-[220px]">
            <h2 className="font-bold text-lg mb-2">{title}</h2>
            <ul className="flex flex-col gap-2">
                {matches.map((match: Match) => (
                    <li
                        key={match.match_id}
                        className="bg-gray-800 p-2 rounded"
                    >
                        {match.teams.faction1.team_name} vs{" "}
                        {match.teams.faction2.team_name}
                        <br />
                        Score: {match.results.score.faction1} -{" "}
                        {match.results.score.faction2}
                    </li>
                ))}
            </ul>
        </div>
    );
}
