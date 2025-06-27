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
        <div className="max-w-[1200px] mx-auto p-5 min-h-screen font-sans">
            {/* Team Header */}
            <div className="bg-bg rounded-xl p-8 mb-8 shadow-md">
                <div className="flex items-center gap-5">
                    {team.team_logo && (
                        <img
                            src={team.team_logo}
                            alt={team.team_name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-border"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-text-primary mb-3">
                            {team.team_name}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-text-primary">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-text-secondary font-bold">
                                    Record:
                                </span>
                                <span className="text-lg text-text-secondary font-medium">
                                    {team.win}-{team.loss}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-text-secondary font-bold">
                                    Seed:
                                </span>
                                <span className="text-lg text-text-secondary font-medium">
                                    {team.seed}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-text-secondary font-bold">
                                    Status:
                                </span>
                                <span className="text-lg text-text-secondary font-medium">
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
            <div className="bg-bg rounded-xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches.map((match) => (
                            <div
                                key={match.match_id}
                                className="border border-border bg-bg-light rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer"
                                onClick={() => {
                                    if (match.faceit_url) {
                                        openInNewTab(match.faceit_url);
                                    }
                                }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-text-secondary font-medium bg-bg-extra-light px-3 py-1 rounded-full">
                                        {match.round}
                                    </span>
                                    <span className="text-sm text-text-secondary">
                                        {formatDate(match.scheduled_at)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className="text-text-primary font-semibold">
                                            {team.team_name}
                                        </span>
                                        <span className="text-lg font-bold text-text-primary min-w-[60px] text-center">
                                            {getMatchScore(match)}
                                        </span>
                                        <span className="text-text-primary font-semibold">
                                            {getOpponent(match)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span
                                            className={`text-sm font-bold px-3 py-1 rounded-full text-center min-w-[30px]
                                                ${
                                                    getMatchResult(match) ===
                                                    "W"
                                                        ? "bg-green-100 text-green-700"
                                                        : getMatchResult(
                                                              match
                                                          ) === "L"
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
                    <div className="text-center text-text-secondary text-base py-10">
                        No matches found for this team.
                    </div>
                )}
            </div>
        </div>
    );
}
