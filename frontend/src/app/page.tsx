"use client";

import type { Match, Team } from "../types/Types";
import { useEffect, useState } from "react";
import Standings from "../components/Standings";
import RegularSeasonBracket from "../components/bracket/RegularSeasonBracket";
import PlayoffBracket from "../components/bracket/PlayoffBracket";
import NonFinishedMatches from "../components/NonFinishedMatches";
import ViewSelector from "../components/ViewSelector";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const [displayTab, setDisplayTab] = useState<
        "regseason" | "playoffs" | "standings"
    >("regseason");

    const viewOptions = [
        { key: "regseason", label: "Regular Season" },
        { key: "playoffs", label: "Playoffs" },
        { key: "standings", label: "Standings" },
    ];

    const handleViewChange = (view: string) => {
        if (
            view === "regseason" ||
            view === "playoffs" ||
            view === "standings"
        ) {
            setDisplayTab(view);
        }
    };

    const {
        data: teamData,
        isLoading: teamsLoading,
        error: teamsError,
        refetch: refetchTeams,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: () =>
            api.get<{
                reg_season: Team[];
                playoffs: Team[];
                last_update: number;
            }>("/team/all"),
    });

    const {
        data: matchData,
        isLoading: matchesLoading,
        error: matchesError,
    } = useQuery({
        queryKey: ["matches"],
        queryFn: () =>
            api.get<{ reg_season: Match[]; playoffs: Match[] }>("/match/all"),
    });

    const loading = teamsLoading || matchesLoading;

    if (teamsError || matchesError) {
        return <div>Error: {teamsError?.message || matchesError?.message}</div>;
    }

    const {
        reg_season: regSeasonTeams,
        playoffs: playoffsTeams,
        last_update: lastUpdate,
    } = loading ? { reg_season: [], playoffs: [], last_update: 0 } : teamData!;

    const { reg_season: regSeasonMatches, playoffs: playoffsMatches } = loading
        ? { reg_season: [], playoffs: [] }
        : matchData!;

    useEffect(() => {
        console.log(regSeasonMatches.length);
        if (regSeasonMatches.length >= 66) {
            setDisplayTab("playoffs");
        }
    }, [regSeasonMatches]);

    const nonFinishedMatches = [...regSeasonMatches, ...playoffsMatches].filter(
        (match) => match.status !== "FINISHED",
    );

    const getCurrentTeams = () => {
        switch (displayTab) {
            case "regseason":
                return regSeasonTeams;
            case "playoffs":
                return playoffsTeams;
            case "standings":
                return regSeasonTeams;
            default:
                return regSeasonTeams;
        }
    };
    const currentTeams = getCurrentTeams();

    return (
        <div className="transform- flex flex-col items-center justify-center">
            <div className="mb-16 flex w-5/6 flex-col items-center justify-center sm:flex-row">
                <img src="/OSSLOGO.png" className="h-48 w-48 sm:h-72 sm:w-72" />
                <div className="flex flex-col text-textPrimary">
                    <h1 className="text-4xl font-semibold sm:text-7xl">
                        OFF SEASON
                        <br />
                        SHENANIGANS
                    </h1>
                    <p className="text-text-secondary text-2xl">
                        Off Season Shenanigans the ultimate Counter-Strike
                        <br />
                        tournament during the off seasons!
                    </p>
                </div>
            </div>
            <div>
                <NonFinishedMatches matches={nonFinishedMatches} />
            </div>
            <div className="my-6">
                <ViewSelector
                    views={viewOptions}
                    currentView={displayTab}
                    onViewChange={handleViewChange}
                />
            </div>
            <div className="relative mt-4 flex w-5/6 flex-col items-center justify-center">
                {displayTab === "regseason" && (
                    <div className="w-full">
                        <RegularSeasonBracket
                            teams={regSeasonTeams}
                            matches={regSeasonMatches}
                        />
                    </div>
                )}
                {displayTab === "playoffs" && (
                    <div className="w-full">
                        <PlayoffBracket
                            teams={playoffsTeams}
                            matches={playoffsMatches}
                        />
                    </div>
                )}
                {displayTab === "standings" && (
                    <Standings teams={currentTeams} />
                )}
            </div>
        </div>
    );
}
