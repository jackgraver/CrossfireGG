import type { Match } from "../types/Types";

type BracketProps = {
    title: string;
    matches: Match[];
};

export default function Section({ title, matches }: BracketProps) {
    return (
        <div className="min-w-[220px]">
            <h2 className="mb-2 text-lg font-bold">{title}</h2>
            <ul className="flex flex-col gap-2">
                {matches.map((match: Match) => (
                    <li key={match.match_id} className="rounded bg-gray-800 p-2">
                        {match.teams.team1.team_name} vs {match.teams.team2.team_name}
                        <br />
                        Score: {match.team1_score} - {match.team2_score}
                    </li>
                ))}
            </ul>
        </div>
    );
}
