import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
    useTournament,
    useMatchesByStage,
    useStageTeams,
} from "../-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import Standings from "@/shared/Standings";
import TopLevelBracket from "@/shared/bracket/TopLevelBracket";
import { Calendar, Users, Trophy, LayoutDashboard, Clock } from "lucide-react";

export const Route = createFileRoute("/tournament/$tournament/")({
    component: RouteComponent,
});

const InfoTile = ({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) => (
    <div className="flex items-center gap-4 p-2 transition-all">
        <div className="bg-cfRed/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="text-cfRed" size={20} />
        </div>
        <div>
            <p className="text-textSecondary text-[10px] font-bold tracking-widest uppercase">
                {label}
            </p>
            <p className="text-textPrimary text-base font-bold">{value}</p>
        </div>
    </div>
);

function RouteComponent() {
    const { tournament: tournamentId } = Route.useParams();
    const [activeTab, setActiveTab] = useState<
        "bracket" | "standings" | "teams"
    >("bracket");

    const { data: tournament, isLoading, error } = useTournament(tournamentId);

    const defaultStage = useMemo(() => {
        if (!tournament?.stages) return null;
        return (
            tournament.stages.find((stage) => stage.is_current) ||
            tournament.stages[0] ||
            null
        );
    }, [tournament]);

    const [currentStage, setCurrentStage] = useState(defaultStage);

    useEffect(() => {
        if (defaultStage && !currentStage) {
            setCurrentStage(defaultStage);
        }
    }, [defaultStage, currentStage]);

    const {
        data: matchesData,
        isLoading: matchesLoading,
        error: matchesError,
    } = useMatchesByStage(currentStage?.ID ?? null);

    const { data: teamsData, isLoading: teamsLoading } = useStageTeams(
        currentStage?.ID ?? null,
    );

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary flex animate-pulse flex-col items-center gap-4">
                    <div className="border-cfRed h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
                    <span className="font-semibold">Loading tournament...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-center">
                    <h2 className="mb-2 text-xl font-bold text-red-500">
                        Error Loading Tournament
                    </h2>
                    <p className="text-textSecondary">{error.message}</p>
                </div>
            </div>
        );
    }

    if (!tournament) {
        return (
            <div className="text-textSecondary flex min-h-screen items-center justify-center">
                Tournament not found
            </div>
        );
    }

    const matches = matchesData?.matches || [];
    const allTeams = teamsData?.groups.flatMap((g) => g.teams) || [];

    return (
        <div className="mx-auto min-h-screen max-w-[1400px] p-6">
            <div className="border-border/40 relative overflow-hidden border-b pt-8 pb-12 md:pt-12 md:pb-16">
                <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-cfRed rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                                {tournament.stages.find((s) => s.is_current)
                                    ?.name || "Ongoing"}
                            </span>
                            <span className="text-textSecondary flex items-center gap-1.5 text-xs font-medium">
                                <Clock size={14} className="opacity-50" />
                                {tournament.start_date
                                    ? formatDateOnly(
                                          toUnixTimestamp(
                                              tournament.start_date,
                                          )!,
                                      )
                                    : "TBD"}
                            </span>
                        </div>
                        <h1 className="text-textPrimary text-5xl font-black tracking-tight md:text-6xl">
                            {tournament.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-4">
                            <InfoTile
                                icon={Calendar}
                                label="Start Date"
                                value={
                                    tournament.start_date
                                        ? formatDateOnly(
                                              toUnixTimestamp(
                                                  tournament.start_date,
                                              )!,
                                          )
                                        : "TBD"
                                }
                            />
                            <InfoTile
                                icon={Users}
                                label="Teams"
                                value={
                                    currentStage
                                        ? `${currentStage.teams_count ?? 0} / ${currentStage.max_teams}`
                                        : "N/A"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 space-y-8">
                <div className="border-border/20 flex flex-col justify-between gap-6 border-b sm:flex-row sm:items-center">
                    <div className="flex gap-10">
                        {[
                            {
                                id: "bracket",
                                label: "Bracket",
                                icon: LayoutDashboard,
                            },
                            {
                                id: "standings",
                                label: "Standings",
                                icon: Trophy,
                            },
                            { id: "teams", label: "Teams", icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`relative flex items-center gap-2.5 pb-4 text-sm font-black transition-all ${
                                    activeTab === tab.id
                                        ? "text-cfRed"
                                        : "text-textSecondary hover:text-textPrimary"
                                }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {tournament.stages.length > 1 && (
                        <div className="bg-secondBg/50 flex items-center gap-1.5 rounded-xl p-1.5">
                            {tournament.stages.map((stage) => (
                                <button
                                    key={stage.ID}
                                    onClick={() => setCurrentStage(stage)}
                                    className={`rounded-lg px-4 py-2 text-[11px] font-black tracking-wider uppercase transition-all ${
                                        currentStage?.ID === stage.ID
                                            ? "bg-cfRed text-white"
                                            : "text-textSecondary hover:bg-thirdBg"
                                    }`}
                                >
                                    {stage.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="min-h-[500px] py-4">
                    {activeTab === "bracket" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {matchesLoading ? (
                                <div className="text-textSecondary flex items-center justify-center py-32">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="border-cfRed h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
                                        <span className="text-sm font-bold tracking-widest uppercase">
                                            Loading bracket...
                                        </span>
                                    </div>
                                </div>
                            ) : matchesError ? (
                                <div className="py-32 text-center text-red-500">
                                    <p className="mb-2 text-xl font-black">
                                        Error loading matches
                                    </p>
                                    <p className="text-sm opacity-70">
                                        {matchesError.message}
                                    </p>
                                </div>
                            ) : matches.length > 0 ? (
                                <TopLevelBracket
                                    stageFormat={currentStage?.format}
                                    stageId={currentStage?.ID ?? null}
                                    matches={matches}
                                />
                            ) : (
                                <div className="text-textSecondary flex flex-col items-center justify-center gap-6 py-32 opacity-20">
                                    <LayoutDashboard
                                        size={64}
                                        strokeWidth={1}
                                    />
                                    <p className="text-sm font-bold tracking-widest uppercase">
                                        No bracket data available
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === "standings" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <Standings teams={allTeams as any} />
                        </div>
                    )}
                    {activeTab === "teams" && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {teamsLoading ? (
                                <div className="text-textSecondary flex items-center justify-center py-32">
                                    <div className="border-cfRed h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
                                </div>
                            ) : allTeams.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {allTeams.map((team) => (
                                        <div
                                            key={team.team_id}
                                            className="group bg-secondBg/30 hover:bg-secondBg/60 relative flex items-center gap-4 rounded-2xl p-5 transition-all"
                                        >
                                            <div className="relative">
                                                {team.team_logo ? (
                                                    <img
                                                        src={team.team_logo}
                                                        alt={team.team_name}
                                                        className="h-14 w-14 rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="bg-thirdBg flex h-14 w-14 items-center justify-center rounded-xl">
                                                        <Users
                                                            size={24}
                                                            className="text-textSecondary opacity-40"
                                                        />
                                                    </div>
                                                )}
                                                <div className="bg-cfRed absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black text-white shadow-lg">
                                                    #{team.seed}
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-textPrimary hover:text-cfRed group-hover:text-cfRed truncate text-lg font-black tracking-tight transition-colors">
                                                    {team.team_name}
                                                </p>
                                                <p className="text-textSecondary text-[10px] font-bold tracking-widest uppercase">
                                                    Team Entry
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-textSecondary flex flex-col items-center justify-center gap-6 py-32 opacity-20">
                                    <Users size={64} strokeWidth={1} />
                                    <p className="text-sm font-bold tracking-widest uppercase">
                                        No teams registered
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
