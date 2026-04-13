import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./tournament/-components/TournamentsSection";
import UpcomingMatches from "./-components/UpcomingMatches";
import { Bot, LogIn, Play, Trophy, Users } from "lucide-react";
import InfoDisplay from "./-components/InfoDisplay";
import HowItWorksSection from "./-components/HowItWorksSection";
import Tile from "./tournament/$tournamentId/-component/Tile";

export const Route = createFileRoute("/")({
    component: App,
});

const PAGE_GUTTER = "mx-auto w-full py-16 max-w-7/12 px-4 sm:px-6";

function App() {
    return (
        <div className="bg-mainBg">
            <div className={PAGE_GUTTER}>
                <div className="relative h-screen overflow-hidden">
                    <div className="to-mainBg absolute inset-0 bg-linear-to-b from-black/30 via-transparent" />
                    <div className="relative z-10 flex h-full min-h-0 flex-col">
                        <div className="flex min-h-0 flex-1 flex-col justify-center pt-6 pb-[10vh]">
                            <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                                <div className="flex min-w-0 flex-1 flex-col gap-6 text-left">
                                    <div className="flex flex-col items-start">
                                        <Tile
                                            bg="bg-green-500/20"
                                            text="text-green-400"
                                            icon={null}
                                            label="• SEASON 5 - NOW ACTIVE"
                                        />
                                        <h1 className="text-5xl pt-2 font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                            CAUGHT IN
                                            <br />
                                            THE <span className="text-orange-500">CROSSFIRE</span>
                                        </h1>
                                        <p className="pt-3 text-base font-semibold tracking-[0.3em] text-orange-400 sm:text-sm">
                                            #CAUGHTINTHECROSSFIRE
                                        </p>
                                        <p className="pt-3 text-textSecondary w-[75%]">
                                            Competitive CrossFire tournaments with $3,000+ in prize
                                            pools. 32 teams battle through group stages and
                                            single-elimination playoffs. Only one squad takes the
                                            crown.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600 rounded-md px-2 py-2 text-xs font-semibold transition-colors">
                                            <Play className="h-4 w-4" />
                                            View Season 5
                                        </button>
                                        <button className="flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 rounded-md px-2 py-2 text-xs font-semibold transition-colors">
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
                                <div className="w-full max-w-84 min-w-0 shrink-0 lg:max-w-96">
                                    <UpcomingMatches />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="mt-16 w-full">
                    <TournamentsSection />
                </section>
            </div>
            <section className="min-h-screen w-full bg-secondBg/20">
                <div className={`${PAGE_GUTTER}`}>
                    <div className="flex w-full items-center justify-between">
                        <span className="text-left font-semibold text-orange-500">
                            SEASON 4 PLAYOFFS
                        </span>
                        <button className="flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 rounded-md px-2 py-2 text-xs font-semibold transition-colors">
                            <Trophy className="h-4 w-4" /> View Full Tournament
                        </button>
                    </div>
                    <h1 className="text-4xl pt-2 font-extrabold tracking-tight text-white">
                        LIVE BRACKET
                    </h1>
                </div>
            </section>
            <div className={PAGE_GUTTER}>
                <HowItWorksSection />
            </div>
            <section className="w-full bg-secondBg/20 py-12 sm:py-16">
                <div className={`${PAGE_GUTTER} text-center`}>
                    <span className="text-orange-500">POWERED BY</span>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        OUR PARTNERS
                    </h1>
                </div>
            </section>
            <div className={PAGE_GUTTER}>
                <section className="pb-16 text-center">
                    <span className="text-orange-500">READY?</span>
                    <h1 className="text-5xl pt-2 font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                        GET CAUGHT IN
                        <br />
                        THE <span className="text-orange-500">CROSSFIRE</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-textSecondary">
                        Season 5 registrations are open. Assemble your squad, sharpen your arm, and
                        compete for the $3,000 prize pool.
                    </p>
                    <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-3">
                        <button className="flex items-center gap-2 rounded-md bg-orange-500 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600">
                            <LogIn className="h-4 w-4" />
                            Register Now
                        </button>
                        <button className="flex items-center gap-2 rounded-md bg-gray-700 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600">
                            <Bot className="h-4 w-4" />
                            Join Discord
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
