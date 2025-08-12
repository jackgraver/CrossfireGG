"use client";

import { useEffect, useState } from "react";
import { PaymentStatus, type Team } from "@/types/TeamModel";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProtectedRoute from "@/shared/ProtectedRoute";
import { ChevronDown, ChevronUp } from "lucide-react";
import Seed from "./Seed";

type Filter = "name" | "paid" | "joined";

type TeamsResponse = {
    reg_season: Team[];
    playoffs: Team[];
    last_update: string;
};

export default function ManageTeams() {
    const queryClient = useQueryClient();

    const [seed, setSeed] = useState(0);

    const [allTeams, setAllTeams] = useState<Team[]>();
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
    const [newTeams, setNewTeams] = useState<Team[]>([
        {
            team_id: "",
            team_name: "",
            team_logo: "",
            seed: 0,
            win: 0,
            loss: 0,
            paid: 0,
            joined_tournament: false,
        },
    ]);

    const filterTeams = (filter: Filter, f: any) => {
        if (!allTeams) return;

        let res: Team[] = allTeams;
        switch (filter) {
            case "name":
                res = res.filter((team) =>
                    team.team_name.toLowerCase().includes(f.toLowerCase()),
                );
                break;
            case "paid":
                console.log(typeof allTeams[0].paid);
                res = res.filter((team) => team.paid === f);
                break;
            case "joined":
                res = res.filter((team) => team.joined_tournament === f);
                break;
        }
        setFilteredTeams(res);
    };

    const { data, isLoading, error } = useQuery<TeamsResponse, Error>({
        queryKey: ["teams"],
        queryFn: () => api.get<TeamsResponse>("/team/all"),
    });

    const paidMutation = useMutation({
        mutationFn: ({
            team_id,
            paid,
        }: {
            team_id: string;
            paid: PaymentStatus;
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

    const handleChange = (index: number, field: string, value: any) => {
        const updated = [...newTeams];
        updated[index] = { ...updated[index], [field]: value };
        console.log(updated);
        setNewTeams(updated);
    };

    useEffect(() => {
        if (data) {
            console.log(data.reg_season);
            const combined = [...data.reg_season, ...data.playoffs];
            setAllTeams(combined);
            setFilteredTeams(combined.sort((a, b) => a.seed - b.seed));
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ProtectedRoute>
            <div className="flex flex-row justify-center space-x-16 pt-12">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex flex-wrap items-end gap-4 rounded-md bg-firstBg p-2 shadow">
                        <div className="flex flex-col">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search for team"
                                className="rounded-md border border-border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="paid"
                                className="mb-1 text-sm text-textSecondary"
                            >
                                Paid Teams
                            </label>
                            <input
                                id="paid"
                                type="checkbox"
                                className="rounded-md border border-border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams(
                                        "paid",
                                        e.target.checked ? 1 : 0,
                                    )
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="joined"
                                className="mb-1 text-sm text-textSecondary"
                            >
                                Teams in Tournament
                            </label>
                            <input
                                id="joined"
                                type="checkbox"
                                className="rounded-md border border-border bg-transparent px-2 py-1"
                                onChange={(e) =>
                                    filterTeams(
                                        "paid",
                                        e.target.checked ? 1 : 0,
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        {filteredTeams.map((team, i) => (
                            <div
                                key={i}
                                className="relative flex flex-row rounded-md bg-firstBg p-4 text-textPrimary shadow-md"
                            >
                                {/* Seed on the left, full vertical */}
                                <div className="mr-4 flex flex-col items-center justify-center">
                                    <Seed seed={seed} setSeed={setSeed} />
                                </div>

                                {/* Team Info + Buttons */}
                                <div className="flex flex-1 flex-col justify-between">
                                    {/* Team name + indicators */}
                                    <div>
                                        <p className="text-2xl font-semibold">
                                            {team.team_name}
                                        </p>
                                        <div className="mt-1 flex gap-2">
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    team.paid ===
                                                    PaymentStatus.Paid
                                                        ? "bg-green-100 text-green-800"
                                                        : team.paid ===
                                                            PaymentStatus.Pending
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {team.paid ===
                                                PaymentStatus.Paid
                                                    ? "Paid"
                                                    : team.paid ===
                                                        PaymentStatus.Pending
                                                      ? "Pending"
                                                      : "Unpaid"}
                                            </span>
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    team.joined_tournament
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {team.joined_tournament
                                                    ? "Joined"
                                                    : "Not Joined"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Buttons row at the bottom */}
                                    <div className="mt-4 flex flex-row gap-2">
                                        <button
                                            className="rounded border border-border px-3 py-1 text-sm"
                                            onClick={() =>
                                                window.open(
                                                    `https://www.faceit.com/en/teams/${team.team_id}/leagues`,
                                                    "_blank",
                                                )
                                            }
                                        >
                                            Visit Faceit
                                        </button>
                                        <button
                                            className="rounded border border-border px-3 py-1 text-sm"
                                            onClick={() =>
                                                paidMutation.mutate({
                                                    team_id: team.team_id,
                                                    paid: team.paid + 1,
                                                })
                                            }
                                        >
                                            Set Paid
                                        </button>
                                        <button
                                            className="rounded border border-border px-3 py-1 text-sm"
                                            onClick={() =>
                                                joinedMutation.mutate({
                                                    team_id: team.team_id,
                                                    joined: !team.joined_tournament,
                                                })
                                            }
                                        >
                                            Set Joined
                                        </button>
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
