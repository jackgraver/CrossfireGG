import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";

type MatchCardProps = {
    match: Match | undefined;
};

export default function MatchCard({ match }: MatchCardProps) {
    // let team1 = "?";
    // let team2 = "?";
    // if (match) {
    //     team1 = match.teams.team1.team_name;
    //     team2 = match.teams.team2.team_name;
    // }

    return (
        <div className="flex flex-col m-2 rounded-md text-gray-200 border">
            <MatchTeam
                team={match?.teams.team1}
                winner={
                    match
                        ? match?.winner === match?.teams.team1.team_id
                        : undefined
                }
                score={match?.team1_score}
            />
            <MatchTeam
                team={match?.teams.team2}
                winner={
                    match
                        ? match?.winner === match?.teams.team2.team_id
                        : undefined
                }
                score={match?.team2_score}
            />
        </div>
    );
}
