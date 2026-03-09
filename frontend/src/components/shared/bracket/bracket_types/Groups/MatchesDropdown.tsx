import {
    MatchWithParticipantAndMinifiedMapsDTO,
    MatchWithParticipantsDTO,
} from "@repo/contracts";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import MatchCard from "../../components/MatchCard";

export default function MatchesDropdown({
    matches,
}: {
    matches: MatchWithParticipantAndMinifiedMapsDTO[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    const matchesByRound = useMemo(
        () =>
            matches.reduce(
                (acc, match) => {
                    const round = match.round || "TBD";
                    if (!acc[round]) {
                        acc[round] = [];
                    }
                    acc[round].push(match);
                    return acc;
                },
                {} as Record<string, MatchWithParticipantsDTO[]>,
            ),
        [matches],
    );

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-bold transition-all ${isOpen ? "bg-white/5 text-white" : "text-textSecondary hover:bg-white/5 hover:text-white"}`}
            >
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 opacity-70" />
                    <span>Group Matches</span>
                    <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold">
                        {matches.length}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )}
            </button>
            {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-2 space-y-6 duration-300">
                    {Object.entries(matchesByRound).map(
                        ([round, roundMatches]) => (
                            <div key={round} className="space-y-3">
                                <div className="flex items-center gap-2 px-1">
                                    <div className="bg-border/50 h-px flex-1" />
                                    <span className="text-textSecondary/60 text-[10px] font-black tracking-[0.2em] uppercase">
                                        Round {round}
                                    </span>
                                    <div className="bg-border/50 h-px flex-1" />
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {roundMatches.map((match, mIndex) => (
                                        <MatchCard
                                            key={mIndex}
                                            match={
                                                match as MatchWithParticipantAndMinifiedMapsDTO
                                            }
                                            margin={false}
                                        />
                                    ))}
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}
