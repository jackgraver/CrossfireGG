import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";
import { useNavigate } from "react-router-dom";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type MatchCardProps = {
    match: Match | undefined;
};

export default function MatchCard({ match }: MatchCardProps) {
    const navigate = useNavigate();
    return (
        <div
            className="group relative flex flex-col m-2 rounded-md text-gray-200 border"
            onClick={() => {
                // if (match?.faceit_url) {
                //     openInNewTab(match.faceit_url);
                // }
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
            {match && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                    <button
                        onClick={() => {
                            if (match?.faceit_url) {
                                openInNewTab(match.faceit_url);
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 transition flex items-center justify-center cursor-pointer"
                    >
                        <img src="/faceit.png" alt="F" className="w-5 h-5" />
                    </button>
                    {match.status === "FINISHED" && (
                        <button
                            onClick={() =>
                                navigate(`/stats/${match?.match_id}`)
                            }
                            className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 transition text-lg cursor-pointer"
                        >
                            📊
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
