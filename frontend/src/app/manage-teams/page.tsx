"use client";

import { useEffect, useState } from "react";
import type { Team } from "@/types/Types";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Filter = "name" | "paid" | "joined";

type TeamsResponse = {
    reg_season: Team[];
    playoffs: Team[];
    last_update: string;
};

export default function ManageTeams() {
    const queryClient = useQueryClient();

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
            paid: false,
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
        queryFn: () => api.get<TeamsResponse>("/team"),
    });

    const paidMutation = useMutation({
        mutationFn: ({ team_id, paid }: { team_id: string; paid: boolean }) =>
            api.post(`/team/paid/${team_id}`, { paid }),
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
        <div className="flex flex-row justify-center space-x-16">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-text-primary pb-12 pt-12 text-4xl">
                    Current Teams
                </h1>
                <div className="mb-2 flex flex-wrap items-end gap-4 rounded-md bg-firstBg p-2 shadow">
                    <div className="flex flex-col">
                        <label
                            htmlFor="search"
                            className="text-text-secondary mb-1 text-sm"
                        >
                            Search
                        </label>
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
                            className="text-text-secondary mb-1 text-sm"
                        >
                            Paid Teams
                        </label>
                        <input
                            id="paid"
                            type="checkbox"
                            className="rounded-md border border-border bg-transparent px-2 py-1"
                            onChange={(e) =>
                                filterTeams("paid", e.target.checked ? 1 : 0)
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="joined"
                            className="text-text-secondary mb-1 text-sm"
                        >
                            Teams in Tournament
                        </label>
                        <input
                            id="joined"
                            type="checkbox"
                            className="rounded-md border border-border bg-transparent px-2 py-1"
                            onChange={(e) =>
                                filterTeams("paid", e.target.checked ? 1 : 0)
                            }
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    {filteredTeams.map((team, i) => (
                        <div
                            key={i}
                            className="text-text-primary relative flex items-center gap-4 rounded-md border border-border bg-firstBg p-4 shadow-md"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <input
                                    type="number"
                                    className="w-12 border-none bg-transparent text-center text-2xl font-bold outline-none"
                                    value={team.seed}
                                    readOnly
                                />
                                <span className="text-text-secondary text-xs">
                                    Seed
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-1">
                                <p className="text-text-secondary text-sm">
                                    {team.team_id}
                                </p>
                                <p className="text-lg font-semibold">
                                    {team.team_name}
                                </p>
                                <div className="mt-1 flex gap-2">
                                    <span
                                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                                            team.paid
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {team.paid ? "Paid" : "Unpaid"}
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
                            <div className="flex flex-col gap-2">
                                <button
                                    className="rounded border border-border px-3 py-1 text-sm"
                                    onClick={() =>
                                        paidMutation.mutate({
                                            team_id: team.team_id,
                                            paid: !team.paid,
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
                                    Toggle Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <h1 className="text-text-primary pb-12 pt-12 text-4xl">
                    Add Teams{" "}
                </h1>
                <div>
                    <div className="flex flex-row space-x-4">
                        <button
                            className="rounded-full px-2 text-4xl"
                            onClick={() =>
                                setNewTeams([
                                    {
                                        team_id: "",
                                        team_name: "",
                                        team_logo: "",
                                        seed: 0,
                                        win: 0,
                                        loss: 0,
                                        paid: false,
                                        joined_tournament: false,
                                    },
                                    ...newTeams,
                                ])
                            }
                        >
                            +
                        </button>
                        <button className="rounded-md bg-green-600 p-2">
                            Submit
                        </button>
                    </div>
                    <div className="space-y-2">
                        {newTeams.map((team, index) => (
                            <div
                                key={index}
                                className="text-text-primary relative flex items-center gap-4 rounded-md border border-border bg-firstBg p-4 shadow-md"
                            >
                                {/* Seed */}
                                <div className="flex flex-col items-center justify-center">
                                    <input
                                        type="number"
                                        className="w-12 border-none bg-transparent text-center text-2xl font-bold outline-none"
                                        value={team.seed}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "seed",
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                    <span className="text-text-secondary text-xs">
                                        Seed
                                    </span>
                                </div>

                                {/* Form Inputs */}
                                <div className="flex flex-1 flex-col gap-2">
                                    {/* Team Name */}
                                    <input
                                        type="text"
                                        placeholder="Team Name"
                                        className="rounded-lg border border-border bg-transparent px-2 py-1 text-lg font-semibold outline-none"
                                        value={team.team_name}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "team_name",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* Status Flags */}
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={team.paid}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "paid",
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            Paid
                                        </label>
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={team.joined_tournament}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        "joined_tournament",
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            Joined
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
