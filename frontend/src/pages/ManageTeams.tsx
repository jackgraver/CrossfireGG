import { useState } from "react";
import type { Team } from "../types/Types";
import InputPopup from "../components/input/InputPopup";
import OSSTable from "../components/OSSTable";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

type SortType = "name" | "seed" | "paid" | "joined";

export default function ManageTeams() {
    const [showInput, setShowInput] = useState(false);
    const [sortType, setSortType] = useState<SortType | null>(null);
    const [sortAscending, setSortAscending] = useState(true);

    const { data, isLoading, error } = useQuery({
        queryKey: ["teams"],
        queryFn: () =>
            api.get<{ reg_season: Team[]; playoffs: Team[] }>("/teams"),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { reg_season: regSeasonTeams, playoffs: playoffsTeams } = data!;

    const allTeams = [...regSeasonTeams, ...playoffsTeams];

    const sortedTeams = [...allTeams].sort((a, b) => {
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
        <div className="flex flex-col justify-center items-center">
            {showInput && <InputPopup />}
            <h1 className="text-4xl pb-12 pt-12 text-gray-200">
                Current Teams
            </h1>
            <OSSTable
                data={sortedTeams}
                columns={[
                    { header: "ID", accessor: "team_id" },
                    { header: "Name", accessor: "team_name" },
                    {
                        header: "Seed",
                        accessor: "seed",
                        cell: (team) => (
                            <input
                                type="number"
                                value={team.seed}
                                className="w-16 text-center rounded border-2 border-gray-300"
                                min="1"
                                readOnly
                            />
                        ),
                    },
                    {
                        header: "Paid",
                        accessor: "paid",
                        cell: (team) => (
                            <div className="flex justify-center items-center">
                                <input
                                    type="checkbox"
                                    checked={team.paid}
                                    className="w-4 h-4"
                                    readOnly
                                />
                            </div>
                        ),
                    },
                    {
                        header: "Joined Tournament",
                        accessor: "joined_tournament",
                        cell: (team) => (
                            <div className="flex justify-center items-center">
                                <input
                                    type="checkbox"
                                    checked={team.joined_tournament}
                                    className="w-4 h-4"
                                    readOnly
                                />
                            </div>
                        ),
                    },
                ]}
            />
            <button
                className="bg-gray-800 rounded-md pt-1 p-2 mt-1"
                onClick={() => setShowInput(true)}
            >
                Add Team
            </button>
        </div>
    );
}
