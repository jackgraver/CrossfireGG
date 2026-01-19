import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { useNavigate } from "@tanstack/react-router";
import ProtectedElement from "@/shared/ProtectedButton";
import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { useAllMatchCasting, useClaimMatch, useUnclaimMatch } from "./-queries/casting.queries";
import { MatchDTO, MatchWithCastersDTO, MatchWithParticipantsDTO } from "@repo/contracts";

export const Route = createFileRoute("/casting/")({
    component: Casting,
});

const getMatchCaster = (match: string, match_casters: any) => {
    if (!match_casters[match]) return "Claimed Error";
    return "Claimed By " + match_casters[match].user_name;
};

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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-textPrimary mb-2 text-4xl font-bold">
                    Match Casting
                </h1>
                <p className="text-textSecondary">
                    Manage match casting assignments and claim matches for
                    casting
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                    <div className="mb-4">
                        <h2 className="text-textPrimary mb-2 text-2xl font-semibold">
                            Available Matches
                        </h2>
                        <p className="text-textSecondary text-sm">
                            {unclaimed.length} match
                            {unclaimed.length !== 1 ? "es" : ""} available
                            for casting
                        </p>
                    </div>
                    <div className="space-y-4">
                        {unclaimed.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                No matches available for casting
                            </div>
                        ) : (
                            unclaimed.map((match) => (
                                <MatchCard
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
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    isClaimed={true}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => { }}
                    className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}


const formatMatchTime = (timestamp: number) => {
    return formatMatchDate(timestamp);
};


const MatchCard = ({
    match,
    isClaimed,
}: {
    match: MatchWithCastersDTO | MatchWithParticipantsDTO;
    isClaimed: boolean;
}
) => {
    const claimMutation = useClaimMatch();
    const unclaimMutation = useUnclaimMatch();

    return (
        <div className="border-border bg-firstBg hover:bg-secondBg rounded-lg border p-4 transition-colors">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm text-gray-400">Round:</span>
                        <span className="text-textPrimary font-medium">
                            {match.round}
                        </span>
                        <div className="ml-8">
                            {isClaimed && "casters" in match && (
                                <span className="mt-1 font-medium text-green-400">
                                    Claimed by {match.casters[0].id}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-3 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <TeamLogo
                                team={match.participants[0].team}
                                styling="h-6 w-6 rounded"
                            />
                            <span className="text-textPrimary font-medium">
                                {match.participants[0].team.name}
                            </span>
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div className="flex items-center gap-2">
                            <TeamLogo
                                team={match.participants[1].team}
                                styling="h-6 w-6 rounded"
                            />
                            <span className="text-textPrimary font-medium">
                                {match.participants[1].team.name}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        Scheduled:
                    </div>
                    <div className="text-sm text-gray-400">
                        Status: {match.status}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => { }}
                        className="text-text border-border bg-firstBg text-textPrimary hover:bg-secondBg rounded border px-3 py-1 text-sm transition-colors"
                    >
                        View
                    </button>
                    {/* <ProtectedElement roles={["PRODUCTION", "PRODUCTION_LEAD"]}> */}
                    {!isClaimed ? (
                        <button
                            onClick={() => claimMutation.mutate(match.id.toString())}
                            // disabled={claimMutation.isPending}
                            className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 disabled:bg-gray-600"
                        >
                            Claim
                        </button>
                    ) : (
                        <button
                            onClick={() => { unclaimMutation.mutate(match.id.toString()); }}
                            // disabled={unclaimMutation.isPending}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700 disabled:bg-gray-600"
                        >
                            Unclaim
                        </button>
                    )}
                    {/* </ProtectedElement> */}
                </div>
            </div>
        </div>
    )
};