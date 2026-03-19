import { createFileRoute } from "@tanstack/react-router";
import TournamentsSection from "./tournament/-components/TournamentsSection";
import InfoBox from "./-components/InfoBox";
import UpcomingMatches from "./-components/UpcomingMatches";
import { Bot, CalendarFold, Twitter } from "lucide-react";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <div className="bg-mainBg">
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 grid h-full grid-cols-[minmax(0,1fr)_minmax(300px,900px)_minmax(0,1fr)]">
                    <div className="relative">
                        <img
                            src="bg3.jpg"
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="to-mainBg absolute inset-0 bg-linear-to-r from-transparent" />
                    </div>
                    <div />
                    <div className="relative">
                        <img
                            src="bg2.jpg"
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="to-mainBg absolute inset-0 bg-linear-to-l from-transparent" />
                    </div>
                </div>
                <div className="to-mainBg absolute inset-0 bg-linear-to-b from-black/30 via-transparent" />
                <div className="relative z-10 flex h-full flex-col items-center px-6 pt-[18vh]">
                    <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
                        <img
                            src="/crossfire.png"
                            className="-mx-18 h-44 w-44 shrink-0 object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.3)] sm:h-60 sm:w-60 lg:h-72 lg:w-72"
                        />
                        <div className="flex flex-col text-center lg:text-left">
                            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                CROSSFIREGG
                            </h1>
                            <div className="mt-3 h-0.5 w-full bg-linear-to-r from-red-600 via-red-500 to-transparent" />
                            <p className="pt-3 text-base font-semibold tracking-[0.3em] text-red-500 sm:text-lg">
                                #CAUGHTINTHECROSSFIRE
                            </p>
                        </div>
                    </div>
                    <div className="mt-auto mb-[10vh] grid w-full max-w-5xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        <InfoBox
                            title="See Crossfire Events"
                            icon={<CalendarFold size={20} />}
                            description="Check out upcoming or previous events and matches"
                            clickAction={() => {
                                const section =
                                    document.querySelector("section");
                                if (section) {
                                    section.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                        />
                        <InfoBox
                            title="Follow us on Twitter"
                            icon={<Twitter size={20} />}
                            description=""
                            clickAction={() =>
                                window.open(
                                    "https://x.com/PlayCrossfireGG",
                                    "_blank",
                                )
                            }
                        />
                        <InfoBox
                            title="Join the Community!"
                            icon={<Bot size={20} />}
                            description="Check out our discord!"
                            clickAction={() =>
                                window.open(
                                    "https://discord.gg/99tm9U5c",
                                    "_blank",
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <section className="mx-auto mt-16 w-full lg:max-w-8/12">
                <UpcomingMatches />
                <TournamentsSection />
            </section>
        </div>
    );
}
