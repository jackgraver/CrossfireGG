import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type ScheduledCardProps = {
    match: Match | undefined;
};

const getDate = (date: number) => {
    const matchDate = new Date(date * 1000);
    const today = new Date();

    // Check if the match is today
    const isToday = matchDate.toDateString() === today.toDateString();

    if (isToday) {
        return (
            "Today @" +
            matchDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        );
    }

    return (
        matchDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }) +
        " @" +
        matchDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    );
};

export default function ScheduledCard({ match }: ScheduledCardProps) {
    if (!match?.scheduled_at) return null;

    return (
        <div className="flex flex-col mx-2">
            <div className="flex flex-row items-center bg-white w-fit max-w-full whitespace-nowrap overflow-hidden text-ellipsis rounded-t-md px-1 py-1">
                <div className="text-xs text-black flex items-center gap-1">
                    <p className="">🕒</p>
                    {getDate(match.scheduled_at)}
                </div>
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
