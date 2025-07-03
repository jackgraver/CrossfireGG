"use client";

import { useState } from "react";
import Notification from "@/components/Notification";
import { formatFullDate } from "@/lib/dateUtils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Tournament = {
    t_id?: string;
    t_name?: string;
    start_date?: number;
    end_date?: number;
    sub_t_id?: string;
};

interface TournamentInfo {
    current_tournament: Tournament;
    current_regular_season: Tournament;
    current_playoffs: Tournament;
    last_update: number;
    current_stage: string;
}

interface NotificationState {
    show: boolean;
    title: string;
    message: string;
    error: boolean;
}

export default function Admin() {
    const queryClient = useQueryClient();
    const [notification, setNotification] = useState<NotificationState>({
        show: false,
        title: "",
        message: "",
        error: false,
    });

    // Fetch tournament data
    const {
        data: tournamentInfo,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["admin-tournament-info"],
        queryFn: async (): Promise<TournamentInfo> => {
            // Fetch data from multiple endpoints
            const [currTournament, lastUpdate, currentStage] =
                await Promise.all([
                    api.get<{ ct: Tournament; cr: Tournament; cp: Tournament }>(
                        "/tournament/current_tournaments",
                    ),
                    api.get<number>("/metadata/last_update"),
                    api.get<string>("/metadata/current_stage"),
                ]);

            // Build the TournamentInfo object
            return {
                current_tournament: currTournament.ct,
                current_regular_season: currTournament.cr,
                current_playoffs: currTournament.cp,
                last_update: lastUpdate,
                current_stage: currentStage,
            };
        },
    });

    // Toggle stage mutation
    const toggleStageMutation = useMutation({
        mutationFn: () =>
            api.post<{ message: string }>("/metadata/toggle_stage", {}),
        onSuccess: (data) => {
            // Refetch the data to get updated information
            queryClient.invalidateQueries({
                queryKey: ["admin-tournament-info"],
            });
            showNotification("Stage Updated", data.message, false);
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.detail || "Failed to toggle stage";
            showNotification("Error", errorMessage, true);
        },
    });

    const showNotification = (
        title: string,
        message: string,
        error: boolean = false,
    ) => {
        setNotification({ show: true, title, message, error });
    };

    const hideNotification = () => {
        setNotification({ show: false, title: "", message: "", error: false });
    };

    const formatTimestamp = (timestamp: number) => {
        return formatFullDate(timestamp);
    };

    const handleToggleStage = () => {
        toggleStageMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-secondBg p-8 text-textPrimary">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-center text-4xl font-bold">ADMIN</h1>

                {isLoading && (
                    <div className="py-4 text-center">
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded bg-red-600 p-4 text-white">
                        <p>Error: {error.message}</p>
                    </div>
                )}

                {tournamentInfo && (
                    <div className="space-y-6">
                        {/* Current Stage */}
                        <div className="rounded bg-firstBg p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                                Current Stage
                            </h2>
                            <div className="rounded bg-firstBg p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-green-400">
                                        {tournamentInfo.current_stage}
                                    </span>
                                    <button
                                        onClick={handleToggleStage}
                                        disabled={toggleStageMutation.isPending}
                                        className="rounded bg-purple-600 px-4 py-2 font-bold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                                    >
                                        {toggleStageMutation.isPending
                                            ? "Toggling..."
                                            : "Toggle Stage"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Last Update */}
                        <div className="rounded bg-firstBg p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                                Last Update
                            </h2>
                            <div className="rounded bg-firstBg p-4">
                                <p className="text-lg">
                                    {formatTimestamp(
                                        tournamentInfo.last_update,
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Current Tournament */}
                        <div className="rounded bg-firstBg p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                                Current Tournament
                            </h2>
                            <div className="rounded bg-firstBg p-4">
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            ID:
                                        </span>{" "}
                                        {tournamentInfo.current_tournament
                                            ?.t_id || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Name:
                                        </span>{" "}
                                        {tournamentInfo.current_tournament
                                            ?.t_name || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Start Date:
                                        </span>{" "}
                                        {tournamentInfo.current_tournament
                                            ?.start_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_tournament
                                                      .start_date,
                                              )
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            End Date:
                                        </span>{" "}
                                        {tournamentInfo.current_tournament
                                            ?.end_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_tournament
                                                      .end_date,
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Regular Season */}
                        <div className="rounded bg-firstBg p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                                Regular Season
                            </h2>
                            <div className="rounded bg-firstBg p-4">
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            ID:
                                        </span>{" "}
                                        {tournamentInfo.current_regular_season
                                            ?.sub_t_id || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Name:
                                        </span>{" "}
                                        {tournamentInfo.current_regular_season
                                            ?.t_name || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Start Date:
                                        </span>{" "}
                                        {tournamentInfo.current_regular_season
                                            ?.start_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_regular_season
                                                      .start_date,
                                              )
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            End Date:
                                        </span>{" "}
                                        {tournamentInfo.current_regular_season
                                            ?.end_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_regular_season
                                                      .end_date,
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Playoffs */}
                        <div className="rounded bg-firstBg p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-blue-400">
                                Playoffs
                            </h2>
                            <div className="rounded bg-firstBg p-4">
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            ID:
                                        </span>{" "}
                                        {tournamentInfo.current_playoffs
                                            ?.sub_t_id || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Name:
                                        </span>{" "}
                                        {tournamentInfo.current_playoffs
                                            ?.t_name || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Start Date:
                                        </span>{" "}
                                        {tournamentInfo.current_playoffs
                                            ?.start_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_playoffs
                                                      .start_date,
                                              )
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            End Date:
                                        </span>{" "}
                                        {tournamentInfo.current_playoffs
                                            ?.end_date
                                            ? formatTimestamp(
                                                  tournamentInfo
                                                      .current_playoffs
                                                      .end_date,
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={() => refetch()}
                        disabled={isLoading}
                        className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-50"
                    >
                        {isLoading ? "Refreshing..." : "Refresh Data"}
                    </button>
                </div>
            </div>

            {notification.show && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    error={notification.error}
                    onClose={hideNotification}
                />
            )}
        </div>
    );
}
