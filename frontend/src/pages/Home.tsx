import type { Match, Team } from "../types/Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Standings from "../components/Standings";
import RegularSeasonBracket from "../components/bracket/RegularSeasonBracket";
import PlayoffBracket from "../components/bracket/PlayoffBracket";
import NonFinishedMatches from "../components/NonFinishedMatches";
import ViewSelector from "../components/ViewSelector";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const navigate = useNavigate();

    const [displayTab, setDisplayTab] = useState<
        "regseason" | "playoffs" | "standings"
    >("regseason");

    const viewOptions = [
        { key: "regseason", label: "Regular Season" },
        { key: "playoffs", label: "Playoffs" },
        { key: "standings", label: "Standings" },
    ];

    const handleViewChange = (view: string) => {
        if (
            view === "regseason" ||
            view === "playoffs" ||
            view === "standings"
        ) {
            setDisplayTab(view);
        }
    };

    const {
        data: teamData,
        isLoading: teamsLoading,
        error: teamsError,
        refetch: refetchTeams,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: () =>
            api.get<{
                reg_season: Team[];
                playoffs: Team[];
                last_update: number;
            }>("/teams"),
    });

    const {
        data: matchData,
        isLoading: matchesLoading,
        error: matchesError,
    } = useQuery({
        queryKey: ["matches"],
        queryFn: () =>
            api.get<{ reg_season: Match[]; playoffs: Match[] }>("/matches"),
    });

    const loading = teamsLoading || matchesLoading;

    if (teamsError || matchesError) {
        return <div>Error: {teamsError?.message || matchesError?.message}</div>;
    }

    const {
        reg_season: regSeasonTeams,
        playoffs: playoffsTeams,
        last_update: lastUpdate,
    } = loading ? { reg_season: [], playoffs: [], last_update: 0 } : teamData!;

    const { reg_season: regSeasonMatches, playoffs: playoffsMatches } = loading
        ? { reg_season: [], playoffs: [] }
        : matchData!;

    const nonFinishedMatches = [...regSeasonMatches, ...playoffsMatches].filter(
        (match) => match.status !== "FINISHED",
    );

    const getCurrentTeams = () => {
        switch (displayTab) {
            case "regseason":
                return regSeasonTeams;
            case "playoffs":
                return playoffsTeams;
            case "standings":
                return regSeasonTeams;
            default:
                return regSeasonTeams;
        }
    };
    const currentTeams = getCurrentTeams();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-16 flex w-5/6 flex-row items-center justify-center">
                <img src="/OSSLOGO.png" className="h-72 w-72" />
                <div className="flex flex-col text-text-primary">
                    <h1 className="text-7xl font-semibold">
                        OFF SEASON
                        <br />
                        SHENANIGANS
                    </h1>
                    <p className="text-2xl text-text-secondary">
                        Off Season Shenanigans the ultimate Counter-Strike
                        <br />
                        tournament during the off seasons!
                    </p>
                </div>
            </div>
            <div>
                <NonFinishedMatches matches={nonFinishedMatches} />
            </div>
            <div className="my-6">
                <ViewSelector
                    views={viewOptions}
                    currentView={displayTab}
                    onViewChange={handleViewChange}
                />
            </div>
            <div className="relative mt-4 flex w-5/6 flex-col items-center justify-center">
                <div className="absolute right-0 top-0 flex flex-row items-center justify-end gap-2 text-white">
                    <p className="text-sm text-gray-400">
                        Last Updated:{" "}
                        {new Date(lastUpdate * 1000).toDateString()}
                    </p>
                    <button
                        onClick={() => refetchTeams()}
                        className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-700"
                        title="Refresh data"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </button>
                </div>
                {displayTab === "regseason" && (
                    <div className="w-full">
                        <RegularSeasonBracket
                            teams={regSeasonTeams}
                            matches={regSeasonMatches}
                        />
                    </div>
                )}
                {displayTab === "playoffs" && (
                    <div className="w-full">
                        <PlayoffBracket
                            teams={playoffsTeams}
                            matches={playoffsMatches}
                        />
                    </div>
                )}
                {displayTab === "standings" && (
                    <Standings teams={currentTeams} />
                )}
            </div>
        </div>
    );
}
