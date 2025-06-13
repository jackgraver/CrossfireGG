// import { FAKETEAMS } from "../lib/Mock";

import { use, useEffect, useState } from "react";
import type { Team } from "../types/Types";
import InputPopup from "../components/input/InputPopup";

export default function ManageTeams() {
    const [showInput, setShowInput] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        async function loadTeams() {
            try {
                const response = await fetch("http://localhost:8000/teams");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeams(data);
            } catch (err) {
                console.error("Failed to fetch teams:", err);
            }
        }

        loadTeams();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            {showInput && <InputPopup />}
            <h1 className="text-4xl pb-12 pt-12">Manage Teamssss </h1>
            <table className="bg-gray-800 mt-2">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Seed</th>
                    <th>Paid</th>
                    <th>Joined Tournament</th>
                </tr>

                {teams.map((team, i) => (
                    <tr
                        key={i}
                        className={`text-center
                                ${i % 2 === 0 ? "bg-gray-800" : "bg-gray-600"}`}
                    >
                        <td className="p-2 w-8">{team.team_id}</td>
                        <td className="w-24">{team.team_name}</td>
                        <td className="w-24">{team.seed}</td>
                        <td className="w-24">{team.paid ? "Y" : "N"}</td>
                        <td className="w-48">
                            {team.joined_tournament ? "Y" : "N"}
                        </td>
                    </tr>
                ))}
            </table>
            <button
                className="bg-gray-800 rounded-md pt-1 p-2 mt-1"
                onClick={() => setShowInput(true)}
            >
                Add Team
            </button>
        </div>
    );
}
