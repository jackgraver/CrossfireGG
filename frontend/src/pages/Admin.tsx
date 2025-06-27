import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { formatFullDate } from "../lib/dateUtils";

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
    const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<NotificationState>({
        show: false,
        title: "",
        message: "",
        error: false,
    });

    const showNotification = (
        title: string,
        message: string,
        error: boolean = false
    ) => {
        setNotification({ show: true, title, message, error });
    };

    const hideNotification = () => {
        setNotification({ show: false, title: "", message: "", error: false });
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch data from multiple endpoints
            const [currTournamentRes, lastUpdateRes, currentStageRes] =
                await Promise.all([
                    fetch("http://localhost:8000/current_tournaments"),
                    fetch("http://localhost:8000/last_update"),
                    fetch("http://localhost:8000/current_stage"),
                ]);

            if (
                !currTournamentRes.ok ||
                !lastUpdateRes.ok ||
                !currentStageRes.ok
            ) {
                throw new Error(`HTTP error! One or more requests failed`);
            }

            const [currTournament, lastUpdate, currentStage] =
                await Promise.all([
                    currTournamentRes.json(),
                    lastUpdateRes.json(),
                    currentStageRes.json(),
                ]);

            // Build the TournamentInfo object
            const info: TournamentInfo = {
                current_tournament: currTournament.ct,
                current_regular_season: currTournament.cr,
                current_playoffs: currTournament.cp,
                last_update: lastUpdate,
                current_stage: currentStage,
            };

            setTournamentInfo(info);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch data on component mount
        fetchData();
    }, []);

    const formatTimestamp = (timestamp: number) => {
        return formatFullDate(timestamp);
    };

    const handleToggleStage = async () => {
        try {
            const response = await fetch("http://localhost:8000/toggle_stage", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            await fetchData();

            showNotification("Stage Updated", `${result.message}`, false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to toggle stage"
            );
            showNotification("Error", "Failed to toggle stage", true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">ADMIN</h1>

                {loading && (
                    <div className="text-center py-4">
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-600 text-white p-4 rounded mb-4">
                        <p>Error: {error}</p>
                    </div>
                )}

                {tournamentInfo && (
                    <div className="space-y-6">
                        {/* Current Stage */}
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Current Stage
                            </h2>
                            <div className="bg-gray-700 p-4 rounded">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-green-400">
                                        {tournamentInfo.current_stage}
                                    </span>
                                    <button
                                        onClick={handleToggleStage}
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                                    >
                                        Toggle Stage
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Last Update */}
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Last Update
                            </h2>
                            <div className="bg-gray-700 p-4 rounded">
                                <p className="text-lg">
                                    {formatTimestamp(
                                        tournamentInfo.last_update
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Current Tournament */}
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Current Tournament
                            </h2>
                            <div className="bg-gray-700 p-4 rounded">
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
                                                      .start_date
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
                                                      .end_date
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Regular Season */}
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Regular Season
                            </h2>
                            <div className="bg-gray-700 p-4 rounded">
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
                                                      .start_date
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
                                                      .end_date
                                              )
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Playoffs */}
                        <div className="bg-gray-800 p-6 rounded">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                                Playoffs
                            </h2>
                            <div className="bg-gray-700 p-4 rounded">
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
                                                      .start_date
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
                                                      .current_playoffs.end_date
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
                        onClick={fetchData}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Refresh Data
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
