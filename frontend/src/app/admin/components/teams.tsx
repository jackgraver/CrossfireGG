"use client";

import { api } from "@/lib/api";
import { Team } from "@/types/Types";
import { useQuery } from "@tanstack/react-query";

export default function ManageTeams() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["teams"],
        queryFn: () => api.get<any>("/team/all"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const teams: Team[] = [...data.reg_season, ...data.playoffs];

    return (
        <div>
            <h1>Manage Teams</h1>
            <div>{teams.map((team) => team.team_id)}</div>
        </div>
    );
}
