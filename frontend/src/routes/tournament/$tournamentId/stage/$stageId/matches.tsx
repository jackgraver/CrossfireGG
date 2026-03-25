import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useMatchesByStage } from "@/lib/api/tournament.queries";
import { groupMatchesByCalendarDay } from "@/lib/match-grouping";
import StageMatchRow from "./-components/StageMatchRow";
import { CalendarDays } from "lucide-react";

export const Route = createFileRoute(
    "/tournament/$tournamentId/stage/$stageId/matches",
)({
    component: StagePage,
});

function StagePage() {
    const { stageId } = Route.useParams();
    const { data: matchesData, isLoading: matchesLoading } = useMatchesByStage(
        Number(stageId),
    );
    const matches = matchesData?.matches ?? [];
    const dayGroups = useMemo(
        () => groupMatchesByCalendarDay(matches),
        [matches],
    );

    return (
        <div className="rounded-xl shadow-md">
            <div>
                {matchesLoading ? (
                    <div className="flex flex-col gap-6">
                        {Array.from({ length: 2 }).map((_, gi) => (
                            <div key={gi} className="flex flex-col gap-3">
                                <div className="bg-thirdBg h-5 w-40 animate-pulse rounded" />
                                {Array.from({ length: 3 }).map((_, mi) => (
                                    <div
                                        key={mi}
                                        className="border-border flex flex-col gap-2 rounded-md border p-3"
                                    >
                                        <div className="bg-thirdBg h-3 w-24 animate-pulse rounded" />
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="bg-thirdBg h-8 w-32 animate-pulse rounded" />
                                            <div className="bg-thirdBg h-6 w-14 animate-pulse rounded" />
                                            <div className="bg-thirdBg h-8 w-32 animate-pulse rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : matches.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-12 text-center">
                        <CalendarDays className="text-textSecondary h-10 w-10" />
                        <p className="text-textSecondary">
                            No matches found for this stage
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {dayGroups.map((group) => (
                            <section key={group.dateKey} className="flex flex-col gap-3">
                                <h2 className="text-textPrimary text-sm font-black tracking-wide uppercase">
                                    {group.label}
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {group.matches.map((match) => (
                                        <StageMatchRow key={match.id} match={match} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
