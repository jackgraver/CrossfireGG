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
                <div className="absolute inset-0">
                    <img
                        src="/LandingBG.png"
                        alt=""
                        className="object-fit h-full w-full object-center"
                    />
                </div>

                <div className="to-mainBg absolute inset-0 bg-linear-to-b from-black/30 via-transparent" />
                <div className="relative z-10 flex h-full min-h-0 flex-col px-4 sm:px-6">
                    <div className="flex w-full flex-col gap-10 pt-[25vh] lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                        <div className="flex w-full max-w-84 shrink-0 flex-col gap-4">
                            <InfoBox
                                title="See Crossfire Events"
                                icon={<CalendarFold size={20} />}
                                description="Check out upcoming or previous events and matches"
                                clickAction={() => {
                                    const section =
                                        document.querySelector("section");
                                    if (section) {
                                        const topPadding = 72;
                                        const y =
                                            section.getBoundingClientRect()
                                                .top +
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
                        <div className="w-full max-w-84 min-w-0 shrink-0 lg:max-w-96">
                            <UpcomingMatches />
                        </div>
                    </div>
                    <div className="mt-auto flex w-full justify-center pt-6 pb-[10vh]">
                        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
                            <img
                                src="/crossfire.png"
                                alt=""
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
                    </div>
                </div>
            </div>
            <section className="mx-auto mt-16 w-full lg:max-w-8/12">
                <TournamentsSection />
            </section>
        </div>
    );
}
