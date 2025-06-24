import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Match, Team } from "../types/Types";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

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
        return new Date(timestamp * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
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
            <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
                <div className="flex items-center gap-5">
                    {team.team_logo && (
                        <img
                            src={team.team_logo}
                            alt={team.team_name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            {team.team_name}
                        </h1>
                        <div className="flex flex-wrap gap-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    Record:
                                </span>
                                <span className="text-lg text-gray-800 font-bold">
                                    {team.win}-{team.loss}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    Seed:
                                </span>
                                <span className="text-lg text-gray-800 font-bold">
                                    {team.seed}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    Status:
                                </span>
                                <span className="text-lg text-gray-800 font-bold">
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
            <div className="bg-white rounded-xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches.map((match) => (
                            <div
                                key={match.match_id}
                                className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
                                        {match.round}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {formatDate(match.scheduled_at)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className="text-gray-800 font-semibold">
                                            {team.team_name}
                                        </span>
                                        <span className="text-lg font-bold text-gray-800 min-w-[60px] text-center">
                                            {getMatchScore(match)}
                                        </span>
                                        <span className="text-gray-800 font-semibold">
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
                                        <span className="text-xs uppercase text-gray-500">
                                            {match.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 text-base py-10">
                        No matches found for this team.
                    </div>
                )}
            </div>
        </div>
    );
}
