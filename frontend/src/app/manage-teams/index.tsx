import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BooleanStatus, type Team } from "@/types/TeamModel";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProtectedRoute from "@/shared/ProtectedRoute";
import SeedControl from "./-components/SeedControl";
import StageSelector from "@/shared/StageSelector";

export const Route = createFileRoute("/manage-teams/")({
    component: ManageTeams,
});

type Filter = "name" | "paid" | "joined" | "stage";

type TeamsResponse = {
    reg_season: Team[];
    playoffs: Team[];
    last_update: string;
};

function ManageTeams() {
    const queryClient = useQueryClient();

    const [regSeasonTeams, setRegSeasonTeams] = useState<Team[]>([]);
    const [playoffsTeams, setPlayoffsTeams] = useState<Team[]>([]);
    const [displaySwitch, setDisplaySwitch] = useState<
        "Regular Season" | "Playoffs"
    >("Regular Season");
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

    const filterTeams = (filter: Filter, f: any) => {
        if (!filteredTeams) return;

        let res: Team[] = filteredTeams;
        switch (filter) {
            case "name":
                res = res.filter((team) =>
                    team.team_name.toLowerCase().includes(f.toLowerCase()),
                );
                break;
            case "paid":
                res = res.filter((team) => team.paid === f);
                break;
            case "joined":
                res = res.filter((team) => team.joined_tournament === f);
                break;
            case "stage":
                setDisplaySwitch(f);
                res = f === "Regular Season" ? regSeasonTeams : playoffsTeams;
                break;
        }
        setFilteredTeams(res);
    };

    const { data, isLoading, error } = useQuery<TeamsResponse, Error>({
        queryKey: ["teams"],
        queryFn: () => api.get<TeamsResponse>("/team/all"),
    });

    const seedMutation = useMutation({
        mutationFn: ({ team_id, seed }: { team_id: string; seed: number }) =>
            api.post(`/team/seed/${team_id}`, { seed }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });

    const paidMutation = useMutation({
        mutationFn: ({
            team_id,
            paid,
        }: {
            team_id: string;
            paid: BooleanStatus;
        }) => api.post(`/team/paid/${team_id}`, { paid }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });

    const joinedMutation = useMutation({
        mutationFn: ({
            team_id,
            joined,
        }: {
            team_id: string;
            joined: boolean;
        }) => api.post(`/team/joined/${team_id}`, { joined }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });

    useEffect(() => {
        if (data) {
            const sorted = data.reg_season.sort((a, b) => a.seed - b.seed);
            setRegSeasonTeams(sorted);
            setPlayoffsTeams(data.playoffs.sort((a, b) => a.seed - b.seed));
            setFilteredTeams(sorted);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ProtectedRoute>
            <div className="flex flex-row justify-center space-x-16 pt-12">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-firstBg mb-2 flex flex-wrap items-end gap-8 rounded-md p-2 shadow">
                        <div className="ml-2 flex flex-col">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search for team"
                                className="border-border rounded-md border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="border-second-bg border-border h-full border" />
                        <div className="flex flex-col">
                            <label
                                htmlFor="paid"
                                className="text-textSecondary mb-1 text-sm"
                            >
                                Paid Teams
                            </label>
                            <input
                                id="paid"
                                type="checkbox"
                                className="border-border rounded-md border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams(
                                        "paid",
                                        e.target.checked ? 1 : 0,
                                    )
                                }
                            />
                        </div>
                        <div className="border-second-bg border-border h-full border" />
                        <div className="flex flex-col">
                            <label
                                htmlFor="joined"
                                className="text-textSecondary mb-1 text-sm"
                            >
                                Teams in Tournament
                            </label>
                            <input
                                id="joined"
                                type="checkbox"
                                className="border-border rounded-md border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams(
                                        "paid",
                                        e.target.checked ? 1 : 0,
                                    )
                                }
                            />
                        </div>
                        <div className="border-second-bg border-border h-full border" />
                        <div className="mr-2 mb-2 flex flex-col">
                            <StageSelector
                                options={["Regular Season", "Playoffs"]}
                                selectedOption={displaySwitch}
                                onOptionSelect={(option) => {
                                    filterTeams("stage", option);
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        {filteredTeams.map((team, i) => (
                            <div
                                key={i}
                                className="bg-firstBg text-textPrimary relative flex flex-row rounded-md p-4 shadow-md"
                            >
                                <div className="mr-4 flex flex-col items-center justify-center">
                                    <SeedControl
                                        seed={team.seed}
                                        setSeed={(newSeed) =>
                                            seedMutation.mutate({
                                                team_id: team.team_id,
                                                seed: newSeed,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <p className="text-2xl font-semibold">
                                            {team.team_name}
                                        </p>
                                        <div className="mt-1 flex gap-2">
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    team.paid ===
                                                    BooleanStatus.True
                                                        ? "bg-green-100 text-green-800"
                                                        : team.paid ===
                                                            BooleanStatus.Pending
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {team.paid ===
                                                BooleanStatus.True
                                                    ? "Paid"
                                                    : team.paid ===
                                                        BooleanStatus.Pending
                                                      ? "Pending"
                                                      : "Unpaid"}
                                            </span>
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    team.joined_tournament ===
                                                    BooleanStatus.True
                                                        ? "bg-green-100 text-green-800"
                                                        : team.joined_tournament ===
                                                            BooleanStatus.Pending
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {team.joined_tournament ===
                                                BooleanStatus.True
                                                    ? "Joined"
                                                    : team.joined_tournament ===
                                                        BooleanStatus.Pending
                                                      ? "Pending"
                                                      : "Not Joined"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-row gap-2">
                                        <button
                                            className="rounded border border-orange-500 px-3 py-1 text-sm hover:bg-orange-600"
                                            onClick={() =>
                                                window.open(
                                                    `https://www.faceit.com/en/teams/${team.team_id}/leagues`,
                                                    "_blank",
                                                )
                                            }
                                        >
                                            Visit Faceit
                                        </button>
                                        {team.paid !== BooleanStatus.True && (
                                            <button
                                                className="rounded border border-green-600 px-3 py-1 text-sm hover:bg-green-600"
                                                onClick={() =>
                                                    paidMutation.mutate({
                                                        team_id: team.team_id,
                                                        paid: team.paid + 1,
                                                    })
                                                }
                                            >
                                                Confirm Paid
                                            </button>
                                        )}
                                        {team.joined_tournament !==
                                            BooleanStatus.True && (
                                            <button
                                                className="rounded border border-blue-500 px-3 py-1 text-sm hover:bg-blue-600"
                                                onClick={() =>
                                                    joinedMutation.mutate({
                                                        team_id: team.team_id,
                                                        joined: !team.joined_tournament,
                                                    })
                                                }
                                            >
                                                Confirmed Joined
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
