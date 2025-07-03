"use client";

import type { Match, Team } from "@/types/Types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatDateOnly } from "@/lib/dateUtils";
import { notFound } from "next/navigation";
import { use } from "react";

const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
};

type TeamProps = {
    params: Promise<{ team_id: string }>;
};

export default function Team({ params }: TeamProps) {
    const { team_id } = use(params);

    if (!team_id) return notFound();

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
            <div className="mb-8 rounded-xl bg-firstBg p-8 shadow-md">
                <div className="flex items-center gap-5">
                    {team.team_logo && (
                        <img
                            src={team.team_logo}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/oss-logo-placeholder.png";
                            }}
                            className="h-20 w-20 rounded-full border-4 border-border object-cover"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-text-primary mb-3 text-3xl font-bold">
                            {team.team_name}
                        </h1>
                        <div className="text-text-primary flex flex-wrap gap-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-text-secondary text-sm font-bold">
                                    Record:
                                </span>
                                <span className="text-text-secondary text-lg font-medium">
                                    {team.win}-{team.loss}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-text-secondary text-sm font-bold">
                                    Seed:
                                </span>
                                <span className="text-text-secondary text-lg font-medium">
                                    {team.seed}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-text-secondary text-sm font-bold">
                                    Status:
                                </span>
                                <span className="text-text-secondary text-lg font-medium">
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
            <div className="rounded-xl bg-firstBg p-8 shadow-md">
                <h2 className="text-text-primary mb-6 text-2xl font-bold">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches.map((match) => (
                            <div
                                key={match.match_id}
                                className="cursor-pointer rounded-lg border border-border bg-secondBg p-5 transition-all hover:bg-thirdBg hover:shadow-lg"
                                onClick={() => {
                                    if (match.faceit_url) {
                                        openInNewTab(match.faceit_url);
                                    }
                                }}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="bg-firstbg-thirdBg text-text-secondary rounded-full px-3 py-1 text-sm font-medium">
                                        {match.round}
                                    </span>
                                    <span className="text-text-secondary text-sm">
                                        {formatDate(match.scheduled_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-1 items-center gap-4">
                                        <span className="text-text-primary font-semibold">
                                            {team.team_name}
                                        </span>
                                        <span className="text-text-primary min-w-[60px] text-center text-lg font-bold">
                                            {getMatchScore(match)}
                                        </span>
                                        <span className="text-text-primary font-semibold">
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
                                        <span className="text-text-secondary text-xs uppercase">
                                            {match.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-text-secondary py-10 text-center text-base">
                        No matches found for this team.
                    </div>
                )}
            </div>
        </div>
    );
}
