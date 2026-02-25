import { createFileRoute } from "@tanstack/react-router";
import { useAllMatchCasting } from "./-queries/casting.queries";
import MatchCastingCard from "./-components/MatchCastingCard";

// const getMatchCaster = (match: string, match_casters: any) => {
//     if (!match_casters[match]) return "Claimed Error";
//     return "Claimed By " + match_casters[match].user_name;
// };

export const Route = createFileRoute("/casting/")({
    component: Casting,
});

function Casting() {
    const { data: castingData, isLoading, error } = useAllMatchCasting();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary text-xl">
                    Loading matches...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-red-500">
                    Error: {error.message}
                </div>
            </div>
        );
    }

    const { claimed, unclaimed } = castingData || {
        claimed: [],
        unclaimed: [],
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-textPrimary mb-2 text-4xl font-bold">
                    Match Casting
                </h1>
                <p className="text-textSecondary">
                    Manage match casting assignments and claim matches for
                    casting
                </p>
            </div>
            <div className="relative grid grid-cols-1 gap-24 lg:grid-cols-2">
                <div className="bg-border absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 lg:block" />
                <div>
                    <div className="mb-4">
                        <h2 className="text-textPrimary mb-2 text-2xl font-semibold">
                            Available Matches
                        </h2>
                        <p className="text-textSecondary text-sm">
                            {unclaimed.length} match
                            {unclaimed.length !== 1 ? "es" : ""} available for
                            casting
                        </p>
                    </div>
                    <div className="space-y-4">
                        {unclaimed.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                No matches available for casting
                            </div>
                        ) : (
                            unclaimed.map((match) => (
                                <MatchCastingCard
                                    key={match.id}
                                    match={match}
                                    isClaimed={false}
                                />
                            ))
                        )}
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <h2 className="text-textPrimary mb-2 text-2xl font-semibold">
                            Claimed Matches
                        </h2>
                        <p className="text-textSecondary text-sm">
                            {claimed.length} match
                            {claimed.length !== 1 ? "es" : ""} assigned to
                            casters
                        </p>
                    </div>
                    <div className="space-y-4">
                        {claimed.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                No matches have been claimed yet
                            </div>
                        ) : (
                            claimed.map((match) => (
                                <MatchCastingCard
                                    key={match.id}
                                    match={match}
                                    isClaimed={true}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
