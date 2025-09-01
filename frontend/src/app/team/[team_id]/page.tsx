"use client";

import type { Match } from "@/types/Types";
import { BooleanStatus, type Team } from "@/types/TeamModel";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatDateOnly } from "@/lib/dateUtils";
import { notFound } from "next/navigation";
import { ReactNode, use, useEffect, useState } from "react";
import TeamLogo from "@/shared/bracket/TeamLogo";
import { toastService } from "@/shared/toast/toastService";
import TournamentSelector from "@/shared/TournamentSelector";
import StageSelector from "@/shared/StageSelector";
import { openInNewTab } from "@/lib/NewTab";

type TeamProps = {
    params: Promise<{ team_id: string }>;
};

export default function Team({ params }: TeamProps) {
    const { team_id } = use(params);

    if (!team_id) return notFound();

    const [displaySwitch, setDisplaySwitch] = useState<
        "Regular Season" | "Playoffs"
    >("Regular Season");
    const [selectedTournament, setSelectedTournament] = useState<string>("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["team", team_id, selectedTournament, displaySwitch],
        queryFn: () => {
            const params = new URLSearchParams();
            if (selectedTournament)
                params.append("tournament_id", selectedTournament);
            if (displaySwitch) params.append("stage", displaySwitch);

            const queryString = params.toString();
            const url = `/team/${team_id}${queryString ? `?${queryString}` : ""}`;

            return api.get<{ team: Team; matches: Match[] }>(url);
        },
    });

    useEffect(() => {
        // Show a one-time toast when arriving from the register page
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
            // Clean the URL to avoid re-triggering on refresh/back
            url.searchParams.delete("from");
            window.history.replaceState({}, "", url.toString());
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { team, matches } = data!;

    const handlePay = async () => {
        const toastId = toastService.display({
            title: "Click below to pay",
            body: (
                <div className="flex justify-center">
                    <button
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400"
                        onClick={async () => {
                            openInNewTab(
                                "https://www.paypal.com/paypalme/OSSCSL/75?currencyCode=USD",
                            );
                            toastService.dismiss(toastId);

                            try {
                                const res = await api.post(
                                    `/team/paid/${team_id}`,
                                    {
                                        paid: 2,
                                        tournament_id: selectedTournament,
                                        stage: displaySwitch,
                                    },
                                );
                                if (
                                    res &&
                                    typeof res === "object" &&
                                    "success" in res &&
                                    res.success
                                ) {
                                    toastService.success(
                                        <p>
                                            Updated paid status, waiting for
                                            confirmation
                                        </p>,
                                        "Team Marked Paid",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                } else {
                                    const message =
                                        res &&
                                        typeof res === "object" &&
                                        "message" in res &&
                                        typeof res.message === "string"
                                            ? res.message
                                            : "Unknown error";
                                    toastService.error(
                                        <p>{message}</p>,
                                        "Update failed",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                }
                            } catch (error) {
                                toastService.error(
                                    <p>Failed to update payment status</p>,
                                    "Update failed",
                                    {
                                        durationMs: 3000,
                                    },
                                );
                            }
                        }}
                    >
                        Pay
                    </button>
                </div>
            ),
            durationMs: -1,
            variant: "center",
        });
    };

    const handleJoined = async () => {
        const toastId = toastService.display({
            title: "Click below to pay",
            body: (
                <div className="flex justify-center">
                    <button
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400"
                        onClick={async () => {
                            openInNewTab(
                                "https://www.faceit.com/en/championship/f56331e8-131a-4c50-b7db-eec8b010ff98/Off%20Season%20Shenanigans%20S8",
                            );
                            toastService.dismiss(toastId);

                            try {
                                const res = await api.post(
                                    `/team/joined/${team_id}`,
                                    {
                                        joined: 2,
                                        tournament_id: selectedTournament,
                                        stage: displaySwitch,
                                    },
                                );
                                if (
                                    res &&
                                    typeof res === "object" &&
                                    "success" in res &&
                                    res.success
                                ) {
                                    toastService.success(
                                        <p>
                                            Updated joined status, waiting for
                                            confirmation
                                        </p>,
                                        "Team Marked Paid",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                } else {
                                    const message =
                                        res &&
                                        typeof res === "object" &&
                                        "message" in res &&
                                        typeof res.message === "string"
                                            ? res.message
                                            : "Unknown error";
                                    toastService.error(
                                        <p>{message}</p>,
                                        "Update failed",
                                        {
                                            durationMs: 3000,
                                        },
                                    );
                                }
                            } catch (error) {
                                toastService.error(
                                    <p>Failed to update payment status</p>,
                                    "Update failed",
                                    {
                                        durationMs: 3000,
                                    },
                                );
                            }
                        }}
                    >
                        Pay
                    </button>
                </div>
            ),
            durationMs: -1,
            variant: "center",
        });
    };

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

    console.log(team);
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
                                <StageSelector
                                    options={["Regular Season", "Playoffs"]}
                                    selectedOption={displaySwitch}
                                    onOptionSelect={(d) => setDisplaySwitch(d)}
                                />
                            </div>

                            <TeamDetail
                                title="Seed:"
                                body={team.seed === -1 ? "-" : team.seed}
                            />
                            <TeamDetail
                                title="Paid:"
                                body={
                                    team.paid === BooleanStatus.False ? (
                                        <button
                                            className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400"
                                            onClick={handlePay}
                                        >
                                            Pay
                                        </button>
                                    ) : team.paid === BooleanStatus.True ? (
                                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                            Paid
                                        </span>
                                    ) : team.paid === BooleanStatus.Pending ? (
                                        <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                                            Pending
                                        </span>
                                    ) : (
                                        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                            Unknown
                                        </span>
                                    )
                                }
                            />
                            <TeamDetail
                                title="Joined Tournament:"
                                body={
                                    team.joined_tournament ===
                                    BooleanStatus.False ? (
                                        <button
                                            className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-textPrimary hover:bg-blue-400"
                                            onClick={handleJoined}
                                        >
                                            Join
                                        </button>
                                    ) : (
                                        <span
                                            className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                team.paid === BooleanStatus.True
                                                    ? "bg-green-100 text-green-800"
                                                    : team.paid ===
                                                        BooleanStatus.Pending
                                                      ? "bg-yellow-100 text-yellow-800"
                                                      : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {team.paid === BooleanStatus.True
                                                ? "Paid"
                                                : team.paid ===
                                                    BooleanStatus.Pending
                                                  ? "Pending"
                                                  : "Unpaid"}
                                        </span>
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Matches Section */}
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
                        No matches yet played this season.
                    </div>
                )}
            </div>
        </div>
    );
}

type TeamDetailProps = {
    title: string;
    body: ReactNode | string;
};

function TeamDetail({ title, body }: TeamDetailProps) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold text-textSecondary">
                {title}
            </span>
            <span className="text-lg font-medium text-textSecondary">
                {body}
            </span>
        </div>
    );
}
