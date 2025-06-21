import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type ScheduledCardProps = {
    match: Match | undefined;
};

const getDate = (date: number) => {
    return (
        new Date(date * 1000).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }) +
        " " +
        new Date(date * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    );
};

export default function ScheduledCard({ match }: ScheduledCardProps) {
    if (!match?.scheduled_at) return null;

    return (
        <div className="flex flex-col mx-2">
            <div className="flex flex-row items-center bg-white w-3/4 rounded-t-md px-2 py-1">
                <p className="text-xs text-black flex items-center gap-1">
                    <p className="pr-1">🕒</p>
                    {getDate(match.scheduled_at)}{" "}
                </p>
            </div>
            <div
                className="flex flex-col rounded-b-md text-gray-200 border cursor-pointer p-2"
                onClick={() => {
                    if (match?.faceit_url) {
                        openInNewTab(match.faceit_url);
                    }
                }}
            >
                <MatchTeam team={match?.teams.team1} />
                <MatchTeam team={match?.teams.team2} />
            </div>
        </div>
    );
}
