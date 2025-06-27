import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Match, Team } from "../types/Types";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatDateOnly } from "../lib/dateUtils";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

export default function Team() {
    const { team_id } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["team", team_id],
        queryFn: () =>
            api.get<{ team: Team; matches: Match[] }>(`/team/${team_id}`),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { team, matches } = data!;

    const formatDate = (timestamp: number) => {
        return formatDateOnly(timestamp);
    };

    const getMatchResult = (match: Match) => {
        if (match.status !== "FINISHED") return "Scheduled";
        if (match.winner === team.team_id) return "W";
        return "L";
    };

    const getMatchScore = (match: Match) => {
        if (match.status !== "FINISHED") return "vs";
        return `${match.team1_score}-${match.team2_score}`;
    };

    const getOpponent = (match: Match) => {
        return match?.teams?.team1?.team_id === team.team_id
            ? match?.teams?.team2?.team_name
            : match?.teams?.team1?.team_name;
    };

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-5 font-sans">
            {/* Team Header */}
            <div className="mb-8 rounded-xl bg-bg p-8 shadow-md">
                <div className="flex items-center gap-5">
                    {team.team_logo && (
                        <img
                            src={team.team_logo}
                            alt={team.team_name}
                            className="h-20 w-20 rounded-full border-4 border-border object-cover"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="mb-3 text-3xl font-bold text-text-primary">
                            {team.team_name}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-text-primary">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-text-secondary">
                                    Record:
                                </span>
                                <span className="text-lg font-medium text-text-secondary">
                                    {team.win}-{team.loss}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-text-secondary">
                                    Seed:
                                </span>
                                <span className="text-lg font-medium text-text-secondary">
                                    {team.seed}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-text-secondary">
                                    Status:
                                </span>
                                <span className="text-lg font-medium text-text-secondary">
                                    {team.paid ? "Paid" : "Unpaid"} •{" "}
                                    {team.joined_tournament
                                        ? "Joined"
                                        : "Not Joined"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Matches Section */}
            <div className="rounded-xl bg-bg p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-text-primary">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches.map((match) => (
                            <div
                                key={match.match_id}
                                className="cursor-pointer rounded-lg border border-border bg-bg-light p-5 transition-all hover:shadow-lg"
                                onClick={() => {
                                    if (match.faceit_url) {
                                        openInNewTab(match.faceit_url);
                                    }
                                }}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="rounded-full bg-bg-extra-light px-3 py-1 text-sm font-medium text-text-secondary">
                                        {match.round}
                                    </span>
                                    <span className="text-sm text-text-secondary">
                                        {formatDate(match.scheduled_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-1 items-center gap-4">
                                        <span className="font-semibold text-text-primary">
                                            {team.team_name}
                                        </span>
                                        <span className="min-w-[60px] text-center text-lg font-bold text-text-primary">
                                            {getMatchScore(match)}
                                        </span>
                                        <span className="font-semibold text-text-primary">
                                            {getOpponent(match)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span
                                            className={`min-w-[30px] rounded-full px-3 py-1 text-center text-sm font-bold ${
                                                getMatchResult(match) === "W"
                                                    ? "bg-green-100 text-green-700"
                                                    : getMatchResult(match) ===
                                                        "L"
                                                      ? "bg-red-100 text-red-700"
                                                      : "bg-orange-100 text-orange-600"
                                            }`}
                                        >
                                            {getMatchResult(match)}
                                        </span>
                                        <span className="text-xs uppercase text-text-secondary">
                                            {match.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-10 text-center text-base text-text-secondary">
                        No matches found for this team.
                    </div>
                )}
            </div>
        </div>
    );
}
