import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./tournament/-components/TournamentsSection";
import { Bot, LogIn, Trophy } from "lucide-react";
import HowItWorksSection from "./-components/HowItWorksSection";
import HomeHero from "./-components/HomeHero";
import HomeSection from "./-components/HomeSection";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <div className="bg-mainBg">
            <HomeSection variant="contained">
                <HomeHero />
                <section className="mt-16 w-full">
                    <TournamentsSection />
                </section>
            </HomeSection>
            <HomeSection variant="band" tone="muted" minHeightScreen>
                <div className="flex w-full items-center justify-between">
                    <span className="text-left font-semibold text-orange-500">
                        SEASON 4 PLAYOFFS
                    </span>
                    <button className="flex items-center gap-2 rounded-md bg-gray-700 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600">
                        <Trophy className="h-4 w-4" /> View Full Tournament
                    </button>
                </div>
                <h1 className="pt-2 text-4xl font-extrabold tracking-tight text-white">
                    LIVE BRACKET
                </h1>
            </HomeSection>
            <HomeSection variant="contained">
                <HowItWorksSection />
            </HomeSection>
            <HomeSection variant="band" tone="muted" compactPadding centered>
                <span className="text-orange-500">POWERED BY</span>
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    OUR PARTNERS
                </h1>
            </HomeSection>
            <HomeSection variant="contained">
                <section className="pb-16 text-center">
                    <span className="text-orange-500">READY?</span>
                    <h1 className="pt-2 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
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
            </HomeSection>
        </div>
    );
}
