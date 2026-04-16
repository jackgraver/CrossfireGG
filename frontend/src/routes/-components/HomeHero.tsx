import InfoDisplay from "./InfoDisplay";
import UpcomingMatches from "./UpcomingMatches";
import Tile from "@/routes/tournament/$tournamentId/-component/Tile";
import { Play, Users } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function HomeHero() {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0" />
            <div className="relative z-10 flex h-full min-h-0 flex-col">
                <div className="flex min-h-0 flex-1 flex-col justify-center pt-6 pb-[10vh]">
                    <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                        <div className="flex min-w-0 flex-1 flex-col gap-6 text-left">
                            <div className="flex flex-col items-start">
                                <Tile
                                    bg="bg-green-500/20"
                                    text="text-green-400"
                                    icon={null}
                                    label="• SEASON 5 - NOW ACTIVE"
                                />
                                <h1 className="pt-2 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                    CAUGHT IN
                                    <br />
                                    THE <span className="text-orange-500">CROSSFIRE</span>
                                </h1>
                                <p className="pt-3 text-base font-semibold tracking-[0.3em] text-orange-400 sm:text-sm">
                                    #CAUGHTINTHECROSSFIRE
                                </p>
                                <p className="w-[75%] pt-3 text-textSecondary">
                                    Competitive CrossFire tournaments with $3,000+ in prize pools.
                                    32 teams battle through group stages and single-elimination
                                    playoffs. Only one squad takes the crown.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    className="flex items-center gap-2 rounded-md bg-orange-500 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
                                    onClick={() =>
                                        navigate({
                                            to: "/tournament/$tournamentId/stage/$stageId/bracket",
                                            params: {
                                                tournamentId: "8",
                                                stageId: "16",
                                            }, //TODO: dont hardcode
                                        })
                                    }
                                >
                                    <Play className="h-4 w-4" />
                                    View Season 5
                                </button>
                                <button
                                    className="flex items-center gap-2 rounded-md bg-gray-700 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600"
                                    onClick={() =>
                                        window.open("https://discord.gg/99tm9U5c", "_blank")
                                    }
                                >
                                    <Users className="h-4 w-4" />
                                    Join Discord
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-12">
                                <InfoDisplay text="$3K+" subtext="PRIZE POOL" />
                                <InfoDisplay text="32" subtext="TEAMS PER SEASON" />
                                <InfoDisplay text="5" subtext="SEASONS RAN" />
                            </div>
                        </div>
                        <div className="w-full max-w-84 min-w-0 shrink-0 lg:max-w-96 lg:pt-9">
                            <UpcomingMatches />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
