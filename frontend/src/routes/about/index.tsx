import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="min-h-screen w-full bg-mainBg">
            <div className="flex w-full flex-col items-stretch gap-10 px-4 pt-10 pb-2 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pb-6">
                <div className="flex w-full min-w-0 flex-col gap-4 lg:w-1/2 lg:shrink-0 lg:pr-6">
                    <h1 className="text-3xl font-bold tracking-tight text-orange-500 sm:text-4xl lg:text-5xl">
                        About CrossfireGG
                    </h1>
                    <p className="w-full text-left text-base font-medium text-textSecondary sm:text-lg">
                        CROSSFIRE is a North American Counter-Strike 2 (CS2) esports league and
                        competitive platform that provides structured, high-level tournaments for
                        semi-pro and aspiring teams. It runs season-based leagues with organized
                        formats like round-robin group stages and playoff brackets, offering
                        consistent scheduling, best-of-three matches, and prize pools to mirror a
                        professional competitive environment. In addition to its leagues, CROSSFIRE
                        also hosts active 10 mans through its community hubs, giving players a place
                        to practice, compete daily, and stay sharp outside of official matches.
                    </p>
                </div>
                <div className="flex w-full min-w-0 items-center justify-center lg:w-1/2 lg:shrink-0 lg:pl-6">
                    <img
                        src="/crossfire.png"
                        alt="Crossfire Logo"
                        className="h-auto w-full max-h-64 object-contain sm:max-h-80 lg:max-h-[min(70vh,36rem)] lg:w-full"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 px-4 pb-10 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                    Find Us On
                </h2>
                <div className="flex w-full flex-row flex-wrap items-center justify-center gap-6">
                    <a
                        href="https://discord.gg/x77gWSYDZk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-3 text-white hover:bg-[#4959c6] transition-colors"
                    >
                        <img 
                            src="/Discord-Symbol-White.svg"
                            alt="Discord Logo"
                            className="h-7 w-7"
                        />
                    </a>
                    <a
                        href="https://x.com/PlayCrossfireGG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-black px-6 py-3 text-white hover:bg-neutral-800 transition-colors"
                    >
                        <img 
                            src="/X logo.svg"
                            alt="X Logo"
                            className="h-7 w-7"
                        />
                    </a>
                    <a
                        href="https://twitch.tv/PlayCrossFire"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-[#9147FF] px-6 py-3 text-white hover:bg-[#722fd2] transition-colors"
                    >
                        <img
                            src="/glitch_flat_white.svg"
                            alt="Twitch Logo"
                            className="h-7 w-7"
                        />
                    </a>
                    <a
                        href="https://www.faceit.com/en/organizers/1b5c9ed3-5233-4c58-8761-78f6ef5a0fd9/CrossfireGG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-white hover:bg-[#cc4400] transition-colors"
                    >
                        <img
                            src="/faceit.png"
                            alt="Faceit Logo"
                            className="h-7 w-7 mr-2"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
