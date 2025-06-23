import type { Match, Team } from "../types/Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Standings from "../components/Standings";
import RegularSeasonBracket from "../components/bracket/RegularSeasonBracket";
import PlayoffBracket from "../components/bracket/PlayoffBracket";
import NonFinishedMatches from "../components/NonFinishedMatches";
import ViewSelector from "../components/ViewSelector";

export default function Home() {
    const navigate = useNavigate();

    const [displayTab, setDisplayTab] = useState<
        "regseason" | "playoffs" | "standings"
    >("regseason");
    const [refreshTeams, setRefreshTeams] = useState(true);
    const [regSeasonTeams, setRegSeasonTeams] = useState<Team[]>([]);
    const [playoffsTeams, setPlayoffsTeams] = useState<Team[]>([]);
    const [lastUpdate, setLastUpdate] = useState(-1);
    const [regSeason, setRegSeason] = useState<Match[]>([]);
    const [playoffs, setPlayoffs] = useState<Match[]>([]);

    // Define the view options
    const viewOptions = [
        { key: "regseason", label: "Regular Season" },
        { key: "playoffs", label: "Playoffs" },
        { key: "standings", label: "Standings" },
    ];

    // Type-safe view change handler
    const handleViewChange = (view: string) => {
        if (
            view === "regseason" ||
            view === "playoffs" ||
            view === "standings"
        ) {
            setDisplayTab(view);
        }
    };

    useEffect(() => {
        async function loadTeams() {
            try {
                const response = await fetch("http://localhost:8000/teams");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRegSeasonTeams(data.reg_season || []);
                setPlayoffsTeams(data.playoffs || []);
                setLastUpdate(data.last_update);
                setRefreshTeams(false);
            } catch (err) {
                console.error("Failed to fetch teams:", err);
            }
        }

        if (refreshTeams) loadTeams();
    }, [refreshTeams]);

    useEffect(() => {
        async function loadMatches() {
            try {
                const response = await fetch("http://localhost:8000/matches");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRegSeason(data.reg_season);
                setPlayoffs(data.playoffs);
            } catch (err) {
                console.error("Failed to fetch teams:", err);
            }
        }

        loadMatches();
    }, []);

    const nonFinishedMatches = [...regSeason, ...playoffs].filter(
        (match) => match.status !== "FINISHED"
    );

    // Get the appropriate teams based on current view
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
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center w-5/6 mt-12 mb-16">
                <img src="/OSSLOGO.png" className="w-72 h-72" />
                <div className="flex flex-col text-white">
                    <h1 className="text-7xl font-semibold">
                        OFF SEASON
                        <br />
                        SHENANIGANS
                    </h1>
                    <p className="text-2xl text-gray-400">
                        Off Season Shenanigans the ultimate Counter-Strike
                        <br />
                        tournament during the off seasons!
                    </p>
                </div>
            </div>
            <div>
                {nonFinishedMatches.length > 0 && (
                    <>
                        <NonFinishedMatches matches={nonFinishedMatches} />
                    </>
                )}
            </div>
            <div className="my-6">
                <ViewSelector
                    views={viewOptions}
                    currentView={displayTab}
                    onViewChange={handleViewChange}
                />
            </div>
            {!currentTeams ? (
                "LOADING..."
            ) : (
                <div className="flex flex-col justify-center items-center w-5/6 mt-4">
                    <div className="flex flex-row justify-end items-center gap-2 w-full mb-4 text-white">
                        <p className="text-sm text-gray-400">
                            Last Updated:{" "}
                            {new Date(lastUpdate * 1000).toDateString()}
                        </p>
                        <button
                            onClick={() => {
                                setRefreshTeams(true);
                            }}
                            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
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
                    </div>{" "}
                    {displayTab === "regseason" && (
                        <div className="w-full">
                            <RegularSeasonBracket
                                teams={regSeasonTeams}
                                matches={regSeason}
                            />
                        </div>
                    )}
                    {displayTab === "playoffs" && (
                        <div className="w-full">
                            <PlayoffBracket
                                teams={playoffsTeams}
                                matches={playoffs}
                            />
                        </div>
                    )}
                    {displayTab === "standings" && (
                        <Standings teams={currentTeams} />
                    )}
                </div>
            )}
        </div>
    );
}
