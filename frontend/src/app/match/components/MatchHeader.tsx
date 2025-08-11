import { formatMatchDate } from "@/lib/dateUtils";
import { Round } from "@/types/Types";
import type { Team } from "@/types/TeamModel";
import { useRouter } from "next/navigation";

type Match = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
    faceit_url: string;
    winner: string;
    teams: { team1: Team; team2: Team };
    team1_score: number;
    team2_score: number;
    caster_id?: number;
};

const formatScore = (score: number, winner: boolean) => {
    if (winner) {
        return <h1 className="text-green-500">{score}</h1>;
    }
    return <h1 className="text-red-500">{score}</h1>;
};

const roundString = (round: Round) => {
    switch (round) {
        case "QF":
            return "QUARTER FINALS";
        case "SF":
            return "SEMI-FINALS";
        case "F":
            return "FINAL";
        case "0-0":
            return round + " (ROUND 1)";
        case "0-1":
        case "1-0":
        case "1-1":
            return round + " (ROUND 2)";
        case "2-0":
        case "0-2":
            return round + " (ROUND 3)";
        case "2-1":
        case "1-2":
        case "2-2":
            return round + " (ROUND 4)";
    }
    return round;
};

type MatchHeaderProps = {
    team1: Team | undefined;
    team2: Team | undefined;
    match: Match | undefined;
};

export default function MatchHeader({ team1, team2, match }: MatchHeaderProps) {
    if (!team1 || !team2 || !match) return null;

    const router = useRouter();

    return (
        <div className="flex max-w-5xl items-center justify-between gap-x-16 px-4">
            {match.status !== "SCHEDULED" && (
                <span className="text-4xl font-extrabold text-green-400">
                    {match.team1_score}
                </span>
            )}
            <div className="flex flex-col items-center text-center text-gray-400">
                <p className="font-bold text-white">{match.status}</p>
                <p>{formatMatchDate(match.scheduled_at)}</p>
                <p>{roundString(match.round)}</p>
            </div>
            {match.status !== "SCHEDULED" && (
                <span className="text-4xl font-extrabold text-white">
                    {match.team2_score}
                </span>
            )}
        </div>
    );
}
