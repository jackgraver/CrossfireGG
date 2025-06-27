import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";
import { formatMatchDate } from "../../lib/dateUtils";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type ScheduledCardProps = {
    match: Match | undefined;
};

export default function ScheduledCard({ match }: ScheduledCardProps) {
    if (!match) {
        return (
            <div className="flex flex-col mx-2">
                <div className="bg-bg w-fit max-w-full whitespace-nowrap overflow-hidden rounded-t-md px-1 py-1">
                    <div className="text-xs text-text-primary  flex items-center gap-1">
                        <p className="">🕒</p>
                    </div>
                </div>
                <div className="group relative flex flex-col rounded-b-md rounded-r-md text-text-primary border border-border cursor-pointer p-2 bg-bg">
                    <MatchTeam team={undefined} score={undefined} />
                    <MatchTeam team={undefined} score={undefined} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col mx-2">
            {match.status == "ONGOING" ? (
                <div className="bg-green-400 w-fit max-w-full whitespace-nowrap overflow-hidden rounded-t-md px-1 py-1">
                    <div className="text-xs text-black flex gap-1">
                        <p className="font-bold mx-2">LIVE!</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row items-center bg-bg w-fit max-w-full whitespace-nowrap overflow-hidden text-ellipsis rounded-t-md px-1 py-1">
                    <div className="text-xs text-text-primary  flex items-center gap-1">
                        <p className="">🕒</p>
                        {formatMatchDate(match.scheduled_at)}
                    </div>
                </div>
            )}
            <div className="group relative flex flex-col rounded-b-md rounded-r-md text-text-primary border border-border cursor-pointer p-2 bg-bg">
                <MatchTeam
                    team={match?.teams.team1}
                    score={match?.team1_score ?? undefined}
                />
                <MatchTeam
                    team={match?.teams.team2}
                    score={match?.team2_score ?? undefined}
                />
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
                </div>
            </div>
        </div>
    );
}
