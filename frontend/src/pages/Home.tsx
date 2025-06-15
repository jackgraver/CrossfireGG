import type { Match, Team } from "../types/Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bracket from "../components/bracket/Bracket";
import Standings from "../components/Standings";

export default function Home() {
    const navigate = useNavigate();

    const [displayTab, setDisplayTab] = useState<"bracket" | "standings">(
        "bracket"
    );
    const [refreshTeams, setRefreshTeams] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        async function loadTeams() {
            try {
                const response = await fetch("http://localhost:8000/teams");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeams(data);
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
                setMatches(data);
            } catch (err) {
                console.error("Failed to fetch teams:", err);
            }
        }

        loadMatches();
    }, []);

    useEffect(() => {
        console.log(matches);
    }, [matches]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center w-5/6">
                <img src="/OSSLOGO.png" className="w-64 h-64" />
                <div className="flex flex-col text-white">
                    <h1 className="text-6xl font-semibold">
                        OFF SEASON
                        <br />
                        SHENANIGANS
                    </h1>
                    <p className="text-2xl">
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
                            style={{
                                width: "50%",
                                left: displayTab === "bracket" ? "0%" : "50%",
                            }}
                        />
                        <button
                            className={`w-32 py-2 text-xl font-bold transition-colors duration-200 ${
                                displayTab === "bracket"
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setDisplayTab("bracket")}
                        >
                            Bracket
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
                    <button
                        onClick={() => {
                            setRefreshTeams(true);
                        }}
                    >
                        Refresh
                    </button>
                    {displayTab === "standings" && <Standings teams={teams} />}
                    {displayTab === "bracket" && (
                        <div className="w-full">
                            <Bracket teams={teams} matches={matches} />
                        </div>
                    )}
                </div>
            )}

            <button
                className="bg-gray-800 rounded-md pt-1 p-2 mt-1"
                onClick={() => navigate("/manage-teams")}
            >
                Manage Teams
            </button>
        </div>
    );
}
