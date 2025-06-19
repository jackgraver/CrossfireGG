import type { Match, Team } from "../types/Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Standings from "../components/Standings";
import RegularSeasonBracket from "../components/bracket/RegularSeasonBracket";
import PlayoffBracket from "../components/bracket/PlayoffBracket";

const createNavButton = (text: string, displayTab: string, onClick: any) => {
    return (
        <button
            className={`w-32 py-2 text-xl font-bold transition-colors duration-200 ${
                displayTab === text ? "text-blue-600" : "text-gray-400"
            }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default function Home() {
    const navigate = useNavigate();

    const [displayTab, setDisplayTab] = useState<
        "regseason" | "playoffs" | "standings"
    >("regseason");
    const [refreshTeams, setRefreshTeams] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [lastUpdate, setLastUpdate] = useState(-1);
    const [regSeason, setRegSeason] = useState<Match[]>([]);
    const [playoffs, setPlayoffs] = useState<Match[]>([]);

    useEffect(() => {
        async function loadTeams() {
            try {
                const response = await fetch("http://localhost:8000/teams");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeams(data.teams);
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
                        Off Season tournament during the off seasons!
                    </p>
                </div>
            </div>
            {teams.length === 0 ? (
                "LOADING..."
            ) : (
                <div className="flex flex-col justify-center items-center w-5/6 mt-4">
                    <div className="relative inline-flex bg-white rounded-md overflow-hidden shadow-md">
                        <div
                            className={`absolute bottom-0 h-1 bg-orange-500 transition-all duration-300 ease-in-out`}
                            // style={{
                            //     width: "50%",
                            //     left: displayTab === "bracket" ? "0%" : "50%",
                            // }}
                        />
                        <button
                            className={`w-32 py-2 text-xl font-bold transition-colors duration-200 ${
                                displayTab === "regseason"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setDisplayTab("regseason")}
                        >
                            Regular Season
                        </button>
                        <button
                            className={`w-32 py-2 text-xl font-bold transition-colors duration-200 ${
                                displayTab === "playoffs"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setDisplayTab("playoffs")}
                        >
                            Playoffs
                        </button>
                        <button
                            className={`w-32 py-2 text-xl font-bold transition-colors duration-200 ${
                                displayTab === "standings"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setDisplayTab("standings")}
                        >
                            Standings
                        </button>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-2 w-full mt-2 text-white">
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
                    </div>

                    {displayTab === "standings" && <Standings teams={teams} />}
                    {displayTab === "playoffs" && (
                        <div className="w-full">
                            <PlayoffBracket teams={teams} matches={playoffs} />
                        </div>
                    )}
                    {displayTab === "regseason" && (
                        <div className="w-full">
                            <RegularSeasonBracket
                                teams={teams}
                                matches={regSeason}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
