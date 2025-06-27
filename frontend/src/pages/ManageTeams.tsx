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
        <div className="flex flex-col items-center justify-center">
            {showInput && <InputPopup />}
            <h1 className="pb-12 pt-12 text-4xl text-text-primary">
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
                                className="w-16 rounded border-2 border-border bg-bg-light text-center text-text-primary"
                                min="1"
                                readOnly
                            />
                        ),
                    },
                    {
                        header: "Paid",
                        accessor: "paid",
                        cell: (team) => (
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={team.paid}
                                    className="h-4 w-4"
                                    readOnly
                                />
                            </div>
                        ),
                    },
                    {
                        header: "Joined Tournament",
                        accessor: "joined_tournament",
                        cell: (team) => (
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={team.joined_tournament}
                                    className="h-4 w-4"
                                    readOnly
                                />
                            </div>
                        ),
                    },
                ]}
            />
            <button
                className="mt-1 rounded-md bg-gray-800 p-2 pt-1"
                onClick={() => setShowInput(true)}
            >
                Add Team
            </button>
        </div>
    );
}
