import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type MatchCardProps = {
    match: Match | undefined;
};

export default function MatchCard({ match }: MatchCardProps) {
    return (
        <div
            className="flex flex-col m-2 rounded-md text-gray-200 border cursor-pointer"
            onClick={() => {
                if (match?.faceit_url) {
                    openInNewTab(match.faceit_url);
                }
            }}
        >
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
