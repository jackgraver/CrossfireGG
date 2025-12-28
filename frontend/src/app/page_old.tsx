import type { Match } from "../types/Types";
import type { Team } from "@/types/TeamModel";
import { useEffect, useState } from "react";
import Standings from "../shared/Standings";
import RegularSeasonBracket from "../shared/bracket/RegularSeasonBracket";
import PlayoffBracket from "../shared/bracket/PlayoffBracket";
import NonFinishedMatches from "../shared/NonFinishedMatches";
import ViewSelector from "../shared/ViewSelector";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import RegisterForTournament from "./RegisterForTournament";
import TournamentSelector from "../shared/TournamentSelector";

export default function HomeOld() {
    const [displayTab, setDisplayTab] = useState<
        "regseason" | "playoffs" | "standings"
    >("regseason");
    const [selectedTournament, setSelectedTournament] = useState<string>("");

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
        queryKey: ["matches", selectedTournament],
        queryFn: () =>
            api.get<{
                reg_season: Match[];
                playoffs: Match[];
                tournament_id: string;
            }>(
                selectedTournament
                    ? `/match/all?tournament_id=${selectedTournament}`
                    : "/match/all",
            ),
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
            <div className="mb-16 flex flex-col items-center justify-center">
                <div className="mb-6 flex w-5/6 flex-col items-center justify-center sm:flex-row">
                    <img
                        src="/OSSLOGO.png"
                        className="h-48 w-48 sm:h-72 sm:w-72"
                    />
                    <div className="text-textPrimary flex flex-col">
                        <h1 className="text-4xl font-semibold sm:text-7xl">
                            OFF SEASON
                            <br />
                            SHENANIGANS
                        </h1>
                        <p className="limit-width text-textSecondary text-2xl">
                            Off Season Shenanigans the ultimate Counter-Strike
                            tournament during the off seasons!
                        </p>
                    </div>
                </div>
                <RegisterForTournament />
            </div>
            {nonFinishedMatches.length > 0 && (
                <div className="mb-6">
                    <NonFinishedMatches matches={nonFinishedMatches} />
                </div>
            )}
            <div className="mb-6">
                <ViewSelector
                    views={viewOptions}
                    currentView={displayTab}
                    onViewChange={handleViewChange}
                />
                <div className="mt-4">
                    <TournamentSelector
                        selectedTournament={matchData?.tournament_id || ""}
                        onTournamentChange={setSelectedTournament}
                    />
                </div>
            </div>
            <div className="relative mt-4 flex flex-col items-center justify-center">
                {displayTab === "regseason" && (
                    <div className="w-full">
                        <RegularSeasonBracket matches={regSeasonMatches} />
                    </div>
                )}
                {displayTab === "playoffs" && (
                    <div className="w-full">
                        <PlayoffBracket matches={playoffsMatches} />
                    </div>
                )}
                {displayTab === "standings" && (
                    <Standings teams={currentTeams} />
                )}
            </div>
        </div>
    );
}
