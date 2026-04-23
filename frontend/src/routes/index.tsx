import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./tournament/-components/TournamentsSection";
import { Bot, LogIn } from "lucide-react";
import HowItWorksSection from "./-components/HowItWorksSection";
import HomeHero from "./-components/HomeHero";
import HomeSection from "./-components/HomeSection";
import HomeLiveBracket from "./-components/HomeLiveBracket";
import SectionTitle from "./-components/SectionTitle";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    const navigate = useNavigate();

    return (
        <div className="bg-mainBg">
            <HomeSection variant="contained">
                <HomeHero />
            </HomeSection>
            <HomeSection variant="contained">
                <TournamentsSection />
            </HomeSection>
            <HomeSection variant="band" tone="muted" minHeightScreen>
                <HomeLiveBracket />
            </HomeSection>
            <HomeSection variant="contained">
                <HowItWorksSection />
            </HomeSection>
            <HomeSection variant="band" tone="muted" compactPadding centered>
                <SectionTitle title="OUR PARTNERS" subtitle="POWERED BY" />
                <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-32">
                    <div className="flex items-center justify-center w-[170px] h-20">
                        <img
                            src="/MYHUD Logo.png"
                            alt="MYHUD Logo"
                            className="object-contain h-full max-w-full"
                        />
                    </div>
                    <div className="flex items-center justify-center w-[170px] h-20">
                        <img
                            src="/SCL Logo.png"
                            alt="SCL Logo"
                            className="object-contain h-full max-w-full"
                        />
                    </div>
                    <div className="flex items-center justify-center w-[170px] h-20">
                        <img
                            src="/faceit logo.jpg"
                            alt="Faceit Logo"
                            className="object-contain h-full max-w-full"
                        />
                    </div>
                </div>
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
                        <button
                            className="flex items-center gap-2 rounded-md bg-orange-500 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
                            onClick={() =>
                                navigate({
                                    to: "/register/team",
                                })
                            }
                        >
                            <LogIn className="h-4 w-4" />
                            Register Now
                        </button>
                        <button
                            className="flex items-center gap-2 rounded-md bg-gray-700 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-600"
                            onClick={() => window.open("https://discord.gg/99tm9U5c", "_blank")}
                        >
                            <Bot className="h-4 w-4" />
                            Join Discord
                        </button>
                    </div>
                </section>
            </HomeSection>
        </div>
    );
}
