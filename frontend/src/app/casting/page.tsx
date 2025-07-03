"use client";

import type { Match, MatchesWithCasters } from "@/types/Types";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { useRouter } from "next/navigation";

export default function Casting() {
    const router = useRouter();

    const queryClient = useQueryClient();
    const [claimStatus, setClaimStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const {
        data: castingData,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["matches-casting"],
        queryFn: () => api.get<MatchesWithCasters>("/matches/casting"),
    });

    const claimMutation = useMutation({
        mutationFn: (matchId: string) =>
            api.post("/matches/claim", { match_id: matchId }),
        onSuccess: () => {
            setClaimStatus({
                type: "success",
                message: "Match claimed successfully!",
            });
            // Refetch the data to update the UI
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
            // Clear the status after 3 seconds
            setTimeout(() => {
                setClaimStatus({ type: null, message: "" });
            }, 3000);
        },
        onError: (error: any) => {
            setClaimStatus({
                type: "error",
                message:
                    error.response?.data?.detail || "Failed to claim match",
            });
            // Clear the status after 5 seconds
            setTimeout(() => {
                setClaimStatus({ type: null, message: "" });
            }, 5000);
        },
    });

    const unclaimMutation = useMutation({
        mutationFn: (matchId: string) =>
            api.post("/matches/unclaim", { match_id: matchId }),
        onSuccess: () => {
            setClaimStatus({
                type: "success",
                message: "Match unclaimed successfully!",
            });
            // Refetch the data to update the UI
            queryClient.invalidateQueries({ queryKey: ["matches-casting"] });
            // Clear the status after 3 seconds
            setTimeout(() => {
                setClaimStatus({ type: null, message: "" });
            }, 3000);
        },
        onError: (error: any) => {
            setClaimStatus({
                type: "error",
                message:
                    error.response?.data?.detail || "Failed to unclaim match",
            });
            // Clear the status after 5 seconds
            setTimeout(() => {
                setClaimStatus({ type: null, message: "" });
            }, 5000);
        },
    });

    const handleClaimMatch = (matchId: string) => {
        claimMutation.mutate(matchId);
    };

    const handleUnclaimMatch = (matchId: string) => {
        unclaimMutation.mutate(matchId);
    };

    const handleViewMatch = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-textPrimary">
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

    const formatMatchTime = (timestamp: number) => {
        return formatMatchDate(timestamp);
    };

    const MatchCard = ({
        match,
        isClaimed,
    }: {
        match: Match;
        isClaimed: boolean;
    }) => (
        <div className="rounded-lg border border-border bg-firstBg p-4 transition-colors hover:bg-secondBg">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm text-gray-400">Round:</span>
                        <span className="font-medium text-textPrimary">
                            {match.round}
                        </span>
                    </div>
                    <div className="mb-3 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={match.teams.team1.team_logo}
                                alt={match.teams.team1.team_name}
                                className="h-6 w-6 rounded"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/oss-logo-placeholder.png";
                                }}
                            />
                            <span className="font-medium text-textPrimary">
                                {match.teams.team1.team_name}
                            </span>
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div className="flex items-center gap-2">
                            <img
                                src={match.teams.team2.team_logo}
                                alt={match.teams.team2.team_name}
                                className="h-6 w-6 rounded"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/oss-logo-placeholder.png";
                                }}
                            />
                            <span className="font-medium text-text-primary">
                                {match.teams.team2.team_name}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        Scheduled: {formatMatchTime(match.scheduled_at)}
                    </div>
                    <div className="text-sm text-gray-400">
                        Status: {match.status}
                    </div>
                    {isClaimed && match.caster_id && (
                        <div className="mt-1 text-sm text-green-400">
                            Claimed by Caster #{match.caster_id}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => handleViewMatch(match.match_id)}
                        className="rounded border border-border bg-firstBg px-3 py-1 text-sm text-text text-text-primary transition-colors hover:bg-secondBg"
                    >
                        View
                    </button>
                    {!isClaimed ? (
                        <button
                            onClick={() => handleClaimMatch(match.match_id)}
                            disabled={claimMutation.isPending}
                            className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 disabled:bg-gray-600"
                        >
                            {claimMutation.isPending ? "Claiming..." : "Claim"}
                        </button>
                    ) : (
                        <button
                            onClick={() => handleUnclaimMatch(match.match_id)}
                            disabled={unclaimMutation.isPending}
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700 disabled:bg-gray-600"
                        >
                            {unclaimMutation.isPending
                                ? "Unclaiming..."
                                : "Unclaim"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Status Notification */}
            {claimStatus.type && (
                <div
                    className={`fixed right-4 top-4 z-50 rounded-lg p-4 shadow-lg ${
                        claimStatus.type === "success"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                    }`}
                >
                    {claimStatus.message}
                </div>
            )}

            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold text-text-primary">
                    Match Casting
                </h1>
                <p className="text-text-secondary">
                    Manage match casting assignments and claim matches for
                    casting
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Unclaimed Matches */}
                <div>
                    <div className="mb-4">
                        <h2 className="mb-2 text-2xl font-semibold text-text-primary">
                            Available Matches
                        </h2>
                        <p className="text-sm text-text-secondary">
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
                                <MatchCard
                                    key={match.match_id}
                                    match={match}
                                    isClaimed={false}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Claimed Matches */}
                <div>
                    <div className="mb-4">
                        <h2 className="mb-2 text-2xl font-semibold text-text-primary">
                            Claimed Matches
                        </h2>
                        <p className="text-sm text-text-secondary">
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
                                    key={match.match_id}
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
                    onClick={() => refetch()}
                    className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}
