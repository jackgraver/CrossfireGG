import { formatMatchDate } from "@/lib/dateUtils";
import { Match, Round } from "@/types/Types";
import type { Team } from "@/types/TeamModel";
import { MatchParticipant } from "@/types/MatchParticipantModel";

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
    team1: MatchParticipant;
    team2: MatchParticipant;
    match: Match;
};

export default function MatchHeader({ team1, team2, match }: MatchHeaderProps) {
    return (
        <div className="flex max-w-5xl items-center justify-between gap-x-16 px-4">
            {match.status !== "SCHEDULED" && (
                <span className="text-4xl font-extrabold text-green-400">
                    {team1.score}
                </span>
            )}
            <div className="flex flex-col items-center text-center text-gray-400">
                <p className="font-bold text-white">
                    {match.status?.toUpperCase()}
                </p>
                <p>{formatMatchDate(match.scheduled_at!)}</p>
                <p>{roundString(match.round!)}</p>
            </div>
            {match.status !== "SCHEDULED" && (
                <span className="text-4xl font-extrabold text-white">
                    {team2.score}
                </span>
            )}
        </div>
    );
}
