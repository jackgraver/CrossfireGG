import { formatMatchDate } from "@/lib/date.utils";
import MatchCard from "./MatchCard";
import { MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";
import { CalendarFold } from "lucide-react";

type ScheduledCardProps = {
    match: MatchWithParticipantAndMinifiedMapsDTO | undefined;
};

export default function ScheduledCard({ match }: ScheduledCardProps) {
    if (!match) {
        return (
            <div className="flex flex-col">
                <div className="bg-firstBg w-fit max-w-full overflow-hidden rounded-t-md px-1 py-1 whitespace-nowrap">
                    <div className="text-textPrimary flex items-center gap-1 text-xs">
                        <p className="w-28">
                            <CalendarFold size={14} />
                        </p>
                        <span className="inline-block animate-pulse rounded dark:bg-gray-700" />
                    </div>
                </div>
                <MatchCard match={match} margin={false} />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {["ongoing", "live"].includes(match.status?.toLowerCase() ?? "") ? (
                <div className="w-fit max-w-full overflow-hidden rounded-t-md bg-green-500 px-1 py-0.5 whitespace-nowrap">
                    <div className="flex gap-1 text-xs text-black">
                        <p className="mx-2 font-bold">LIVE!</p>
                    </div>
                </div>
            ) : (
                <div className="bg-firstBg flex w-fit max-w-full flex-row items-center overflow-hidden rounded-t-md px-1 py-1 text-ellipsis whitespace-nowrap">
                    <div className="text-textPrimary flex items-center gap-1 text-xs">
                        <p className="mr-2 ml-1 flex items-center gap-1 font-bold">
                            <CalendarFold size={14} />
                            <span>{formatMatchDate(match?.scheduled_at ?? 0)}</span>
                        </p>
                    </div>
                </div>
            )}
            <MatchCard match={match} margin={false} unroundedTop />
        </div>
    );
}
