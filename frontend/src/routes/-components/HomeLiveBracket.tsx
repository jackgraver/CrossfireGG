import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import TopLevelBracket from "@/components/shared/bracket/TopLevelBracket";
import { useStageBracket, useTournamentById } from "@/lib/api/tournament.queries";

function HomeLiveBracketSkeleton() {
    return (
        <div className="w-full space-y-4">
            <div className="flex w-full items-center justify-between gap-4">
                <div className="bg-thirdBg h-5 w-40 animate-pulse rounded md:w-56" />
                <div className="bg-thirdBg h-9 w-44 shrink-0 animate-pulse rounded-md" />
            </div>
            <div className="bg-thirdBg h-10 w-48 animate-pulse rounded" />
            <div className="bg-thirdBg/80 min-h-64 w-full animate-pulse rounded-xl" />
        </div>
    );
}

export default function HomeLiveBracket() {
    const {
        data: bracket,
        isLoading: loadingBracket,
        error: bracketError,
    } = useStageBracket("live");
    const target = bracket?.liveContext;
    const tournamentIdStr = target ? String(target.tournamentId) : "";
    useTournamentById(tournamentIdStr);

    if (bracketError) {
        return (
            <div className="text-textSecondary text-sm">
                Could not load the live bracket. Please try again later.
            </div>
        );
    }

    if (loadingBracket) {
        return <HomeLiveBracketSkeleton />;
    }

    if (!bracket || !target) {
        return (
            <div className="text-textSecondary text-sm">
                There is no active tournament with a live stage right now. Check back during
                playoffs.
            </div>
        );
    }

    if (bracket.groups.length === 0) {
        return (
            <div className="space-y-3">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-left font-semibold text-orange-500 uppercase">
                        {target.tournamentName}
                    </span>
                    <Link
                        to="/tournament/$tournamentId/stage/$stageId/bracket"
                        params={{
                            tournamentId: target.tournamentId,
                            stageId: target.stageId,
                        }}
                        className="flex w-fit items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600"
                    >
                        <Trophy className="h-4 w-4" />
                        View full tournament
                    </Link>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {target.stageName}
                </h2>
                <p className="text-textSecondary text-sm">No bracket matches for this stage yet.</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-left font-semibold text-orange-500 uppercase">
                    {target.tournamentName}
                </span>
                <Link
                    to="/tournament/$tournamentId/stage/$stageId/bracket"
                    params={{
                        tournamentId: target.tournamentId,
                        stageId: target.stageId,
                    }}
                    className="flex w-fit items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600"
                >
                    <Trophy className="h-4 w-4" />
                    View full tournament
                </Link>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {target.stageName}
            </h2>
            <div className="text-textPrimary w-full overflow-x-auto pb-2">
                <TopLevelBracket stageFormat={bracket.format} groups={bracket.groups} />
            </div>
        </div>
    );
}
