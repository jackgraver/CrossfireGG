// import { FAKETEAMS } from "../lib/Mock";

import { useEffect, useState } from "react";
import type { Team } from "../types/Types";
import InputPopup from "../components/input/InputPopup";

type SortType = "name" | "seed" | "paid" | "joined";

export default function ManageTeams() {
    const [showInput, setShowInput] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortAscending, setSortAscending] = useState(true);

    useEffect(() => {
        async function loadTeams() {
            try {
                const response = await fetch("http://localhost:8000/teams");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTeams(data.teams);
            } catch (err) {
                console.error("Failed to fetch teams:", err);
            }
        }

        loadTeams();
    }, []);

    const handleSort = (type: SortType) => {
        if (sortType === type) {
            setSortAscending(!sortAscending);
        } else {
            setSortType(type);
            setSortAscending(true);
        }
    };

    const handleSeedChange = async (teamId: string, newSeed: number) => {
        try {
            const response = await fetch(
                `http://localhost:8000/teams/${teamId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ seed: newSeed }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setTeams(
                teams.map((team) =>
                    team.team_id === teamId ? { ...team, seed: newSeed } : team
                )
            );
        } catch (err) {
            console.error("Failed to update seed:", err);
        }
    };

    const handlePaidChange = async (teamId: string, newPaid: boolean) => {
        try {
            const response = await fetch(
                `http://localhost:8000/teams/${teamId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ paid: newPaid }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setTeams(
                teams.map((team) =>
                    team.team_id === teamId ? { ...team, paid: newPaid } : team
                )
            );
        } catch (err) {
            console.error("Failed to update paid status:", err);
        }
    };

    const handleJoinedChange = async (teamId: string, newJoined: boolean) => {
        try {
            const response = await fetch(
                `http://localhost:8000/teams/${teamId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ joined_tournament: newJoined }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setTeams(
                teams.map((team) =>
                    team.team_id === teamId
                        ? { ...team, joined_tournament: newJoined }
                        : team
                )
            );
        } catch (err) {
            console.error("Failed to update joined status:", err);
        }
    };

    const sortedTeams = [...teams].sort((a, b) => {
        if (!sortType) return 0;

        let comparison = 0;
        switch (sortType) {
            case "name":
                comparison = a.team_name.localeCompare(b.team_name);
                break;
            case "seed":
                comparison = a.seed - b.seed;
                break;
            case "paid":
                comparison = a.paid === b.paid ? 0 : a.paid ? 1 : -1;
                break;
            case "joined":
                comparison =
                    a.joined_tournament === b.joined_tournament
                        ? 0
                        : a.joined_tournament
                        ? 1
                        : -1;
                break;
        }

        return sortAscending ? comparison : -comparison;
    });

    return (
        <div className="flex flex-col justify-center items-center text-white">
            {showInput && <InputPopup />}
            <h1 className="text-4xl pb-12 pt-12">Current Teams</h1>
            <table className="bg-gray-800 mt-2">
                <tr className="border-b border-white">
                    <th>ID </th>
                    <th
                        className="cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("name")}
                    >
                        Name{" "}
                        {sortType === "name" && (sortAscending ? "↑" : "↓")}
                    </th>
                    <th
                        className="cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("seed")}
                    >
                        Seed{" "}
                        {sortType === "seed" && (sortAscending ? "↑" : "↓")}
                    </th>
                    <th
                        className="cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("paid")}
                    >
                        Paid{" "}
                        {sortType === "paid" && (sortAscending ? "↑" : "↓")}
                    </th>
                    <th
                        className="cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("joined")}
                    >
                        Joined Tournament{" "}
                        {sortType === "joined" && (sortAscending ? "↑" : "↓")}
                    </th>
                </tr>

                {sortedTeams.map((team, i) => (
                    <tr
                        key={i}
                        className={`text-center
                                ${i % 2 === 0 ? "bg-gray-800" : "bg-gray-600"}`}
                    >
                        <td className="p-2 w-8">{team.team_id}</td>
                        <td className="w-24">{team.team_name}</td>
                        <td className="w-24">
                            <input
                                type="number"
                                value={team.seed}
                                className="w-16 bg-gray-700 text-white text-center rounded"
                                min="1"
                                readOnly
                            />
                        </td>
                        <td className="w-24">
                            <input
                                type="checkbox"
                                checked={team.paid}
                                className="w-4 h-4"
                                readOnly
                            />
                        </td>
                        <td className="w-48">
                            <input
                                type="checkbox"
                                checked={team.joined_tournament}
                                className="w-4 h-4"
                                readOnly
                            />
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
