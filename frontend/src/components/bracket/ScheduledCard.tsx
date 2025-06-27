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
            <div className="mx-2 flex flex-col">
                <div className="w-fit max-w-full overflow-hidden whitespace-nowrap rounded-t-md bg-bg px-1 py-1">
                    <div className="flex items-center gap-1 text-xs text-text-primary">
                        <p className="">🕒</p>
                    </div>
                </div>
                <div className="group relative flex cursor-pointer flex-col rounded-b-md rounded-r-md border border-border bg-bg p-2 text-text-primary">
                    <MatchTeam team={undefined} score={undefined} />
                    <MatchTeam team={undefined} score={undefined} />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-2 flex flex-col">
            {match.status == "ONGOING" ? (
                <div className="w-fit max-w-full overflow-hidden whitespace-nowrap rounded-t-md bg-green-400 px-1 py-1">
                    <div className="flex gap-1 text-xs text-black">
                        <p className="mx-2 font-bold">LIVE!</p>
                    </div>
                </div>
            ) : (
                <div className="flex w-fit max-w-full flex-row items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-t-md bg-bg px-1 py-1">
                    <div className="flex items-center gap-1 text-xs text-text-primary">
                        <p className="">🕒</p>
                        {formatMatchDate(match.scheduled_at)}
                    </div>
                </div>
            )}
            <div className="group relative flex cursor-pointer flex-col rounded-b-md rounded-r-md border border-border bg-bg p-2 text-text-primary">
                <MatchTeam
                    team={match?.teams.team1}
                    score={match?.team1_score ?? undefined}
                />
                <MatchTeam
                    team={match?.teams.team2}
                    score={match?.team2_score ?? undefined}
                />
                <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                        onClick={() => {
                            if (match?.faceit_url) {
                                openInNewTab(match.faceit_url);
                            }
                        }}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                    >
                        <img src="/faceit.png" alt="F" className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
