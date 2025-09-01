"use client";

import type { Match } from "@/types/Types";
import { type Team } from "@/types/TeamModel";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatDateOnly } from "@/lib/dateUtils";
import { notFound, redirect } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";
import TeamLogo from "@/shared/bracket/TeamLogo";
import { toastService } from "@/shared/toast/toastService";
import TournamentSelector from "@/shared/TournamentSelector";
import StageSelector from "@/shared/StageSelector";
import { openInNewTab } from "@/lib/NewTab";
import {
    getJoinedStatus,
    getPaidStatus,
} from "../components/ConditionalDetailFunctions";

type TeamProps = {
    params: Promise<{ team_id: string }>;
};

export default function Team({ params }: TeamProps) {
    const { team_id } = use(params);

    if (!team_id) return notFound();

    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("from") === "register") {
        toastService.display({
            title: "Thanks for registering. Click below to pay",
            body: (
                <div className="flex justify-center">
                    <button className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400">
                        Pay
                    </button>
                </div>
            ),
            durationMs: 10000,
            variant: "center",
        });
        url.searchParams.delete("from");
        window.history.replaceState({}, "", url.toString());
    }

    const [stageDisplaySwitch, setStageDisplaySwitch] = useState<
        "Regular Season" | "Playoffs"
    >("Regular Season");
    const [selectedTournament, setSelectedTournament] = useState<string>("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["team", team_id, selectedTournament, stageDisplaySwitch],
        queryFn: () => {
            const params = new URLSearchParams();
            if (selectedTournament)
                params.append("tournament_id", selectedTournament);
            if (stageDisplaySwitch) params.append("stage", stageDisplaySwitch);

            const queryString = params.toString();
            const url = `/team/${team_id}${queryString ? `?${queryString}` : ""}`;

            return api.get<{ team: Team; matches: Match[] }>(url);
        },
    });

    if (isLoading) {
        return <></>;
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
            <div className="mb-8 rounded-xl bg-firstBg p-8 shadow-md">
                <div className="flex items-center gap-5">
                    <TeamLogo
                        team={team}
                        styling="h-32 w-32 rounded-full border-4 border-border object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex flex-row gap-x-2">
                            <h1 className="mb-3 text-3xl font-bold text-textPrimary">
                                {team.team_name}
                            </h1>
                            <h2 className="mt-0.5 text-2xl font-bold text-textSecondary">{`(${team.win}-${team.loss})`}</h2>
                        </div>
                        <div className="flex flex-wrap gap-8 text-textPrimary">
                            <div className="flex flex-col items-start gap-2">
                                <TournamentSelector
                                    selectedTournament={selectedTournament}
                                    onTournamentChange={(t) =>
                                        setSelectedTournament(t)
                                    }
                                />
                                <div className="ml-1">
                                    <StageSelector
                                        options={["Regular Season", "Playoffs"]}
                                        selectedOption={stageDisplaySwitch}
                                        onOptionSelect={(stage) =>
                                            setStageDisplaySwitch(stage)
                                        }
                                    />
                                </div>
                            </div>
                            <TeamDetail
                                title="Seed:"
                                body={team.seed === -1 ? "-" : team.seed}
                            />
                            <TeamDetail
                                title="Paid:"
                                value={team.paid}
                                body={getPaidStatus(team.paid)}
                            />
                            <TeamDetail
                                title="Joined Tournament:"
                                value={team.joined_tournament}
                                body={getJoinedStatus(team.joined_tournament)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-xl bg-firstBg p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-textPrimary">
                    Match History
                </h2>
                {matches && matches.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {matches
                            .sort((a, b) => b.scheduled_at - a.scheduled_at)
                            .map((match) => (
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
                                        <span className="bg-firstbg-thirdBg rounded-full py-1 text-sm font-medium text-textSecondary">
                                            {match.round}
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            {formatDate(match.scheduled_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-1 items-center gap-4">
                                            <span className="font-semibold text-textPrimary">
                                                {team.team_name}
                                            </span>
                                            <span className="min-w-[60px] text-center text-lg font-bold text-textPrimary">
                                                {getMatchScore(match)}
                                            </span>
                                            <span className="font-semibold text-textPrimary">
                                                {getOpponent(match)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span
                                                className={`min-w-[30px] rounded-full px-3 py-1 text-center text-sm font-bold ${
                                                    getMatchResult(match) ===
                                                    "W"
                                                        ? "bg-green-100 text-green-700"
                                                        : getMatchResult(
                                                                match,
                                                            ) === "L"
                                                          ? "bg-red-100 text-red-700"
                                                          : "bg-orange-100 text-orange-600"
                                                }`}
                                            >
                                                {getMatchResult(match)}
                                            </span>
                                            <span className="text-xs uppercase text-textSecondary">
                                                {match.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="py-10 text-center text-base text-textSecondary">
                        No matches played this season.
                    </div>
                )}
            </div>
        </div>
    );
}

type TeamDetailProps = {
    title: string;
    body?: ReactNode | ((value: any) => ReactNode);
    value?: any; // optional, only needed if body is a function
};

function TeamDetail({ title, body, value }: TeamDetailProps) {
    const renderBody = typeof body === "function" ? body(value) : body;

    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold text-textSecondary">
                {title}
            </span>
            {renderBody && (
                <span className="text-lg font-medium text-textSecondary">
                    {renderBody}
                </span>
            )}
        </div>
    );
}
