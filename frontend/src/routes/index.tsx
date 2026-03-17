import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./tournament/-components/TournamentsSection";
import InfoBox from "./-components/InfoBox";
import UpcomingMatches from "./-components/UpcomingMatches";
import { Bot, CalendarFold, CircleQuestionMark } from "lucide-react";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <div>
            <div className="flex h-screen flex-col items-center">
                <div className="flex flex-row items-center">
                    <img src="/crossfire.png" className="h-96 w-96" />
                    <div className="flex flex-col text-center">
                        <h1 className="text-6xl font-bold">CROSSFIREGG</h1>
                        <p className="text-xl text-red-500">
                            #CAUGHTINTHECROSSFIRE
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-32 pt-24">
                    <InfoBox
                        title="See Crossfire Events"
                        icon={<CalendarFold size={20} />}
                        description="Check out upcoming or previous events and matches"
                        clickAction={() => {
                            const section = document.querySelector("section");
                            if (section) {
                                const topPadding = 72;
                                const y =
                                    section.getBoundingClientRect().top +
                                    window.scrollY -
                                    topPadding;

                                window.scrollTo({
                                    top: y,
                                    behavior: "smooth",
                                });
                            }
                        }}
                    />
                    <InfoBox
                        title="Bruh.. I forgor"
                        icon={<CircleQuestionMark size={20} />}
                        description=""
                    />
                    <InfoBox
                        title="Join the Community!"
                        icon={<Bot size={20} />}
                        description="Check out our discord!"
                        clickAction={() =>
                            window.open("https://discord.gg/99tm9U5c", "_blank")
                        }
                    />
                </div>
            </div>
            <section>
                <UpcomingMatches />
                <TournamentsSection />
            </section>
        </div>
    );
}
