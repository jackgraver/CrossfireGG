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
            <div className="flex flex-col justify-center items-center bg-gray-800 rounded-md w-5/6">
                {/* <img
                    src="/OSSLOGO.png"
                    className="absolute w-64 h-64 opacity-30"
                /> */}

                <h1 className="text-6xl"> Off Season Shenanigans</h1>
                <p>Off Season tournament during the off seasons!</p>
            </div>
            {teams.length === 0 ? (
                "LOADING..."
            ) : (
                <div className="flex flex-col justify-center items-center bg-gray-800 rounded-md w-5/6 mt-4">
                    <div className="rounded-md p-2 w-48">
                        <button
                            className={`
                        bg-gray-600 p-2 rounded-md m-2
                        ${displayTab === "bracket" && "text-green-400"}`}
                            onClick={() => setDisplayTab("bracket")}
                        >
                            Bracket
                        </button>
                        <button
                            className={`
                        bg-gray-600 p-2 rounded-md
                        ${displayTab === "standings" && "text-green-400"}`}
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
