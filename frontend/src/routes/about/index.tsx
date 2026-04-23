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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.447.864-.614 1.249a18.488 18.488 0 00-5.487 0 12.48 12.48 0 00-.625-1.25.07.07 0 00-.073-.034 19.736 19.736 0 00-4.886 1.516.064.064 0 00-.03.027C1.058 7.036.183 9.602.003 12.217c0 .012.005.023.012.032a19.888 19.888 0 005.992 3.036.07.07 0 00.078-.027c.462-.651.87-1.34 1.217-2.062a.07.07 0 00-.038-.094 13.07 13.07 0 01-1.872-.902.07.07 0 01-.007-.116c.126-.094.252-.192.371-.291a.07.07 0 01.071-.01c3.927 1.808 8.17 1.808 12.062 0a.07.07 0 01.072.009c.12.099.245.198.372.292a.07.07 0 01-.006.116c-.601.347-1.222.658-1.873.903a.07.07 0 00-.037.093c.36.721.769 1.411 1.218 2.062a.07.07 0 00.078.028 19.876 19.876 0 005.992-3.037.07.07 0 00.012-.031c-.18-2.616-1.056-5.182-2.912-7.82a.06.06 0 00-.03-.028zM8.02 14.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.214 0 2.175 1.099 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.96 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.214 0 2.175 1.099 2.157 2.418 0 1.334-.944 2.419-2.157 2.419z" />
                        </svg>
                        <span className="text-sm font-semibold">Discord</span>
                    </a>
                    <a
                        href="https://x.com/PlayCrossfireGG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-black px-6 py-3 text-white hover:bg-neutral-800 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-7 w-7"
                        >
                            <path
                                fill="currentColor"
                                d="M16.072 3h4.427l-7.627 8.72L22 21h-6.998l-5.031-6.184L3.59 21H.16l8.132-9.295L2 3h7.118l4.684 5.75L16.072 3zm-1.16 15.925h1.226l-7.868-9.673H7.09l7.821 9.673zm-6.372-13.29h-1.2l7.331 8.97h1.162l-7.293-8.97z"
                            />
                        </svg>
                        <span className="text-sm font-semibold">X</span>
                    </a>
                    <a
                        href="https://twitch.tv/PlayCrossFire"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-[#9147FF] px-6 py-3 text-white hover:bg-[#722fd2] transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path d="M4.285 2L2 6.428V20.57h4v3h3.143l3-3H17.43L22 15.285V2H4.285zm15.143 12.571L17.428 17H11.29l-3 3V17H4V4h15.428v10.571zm-7.428-6h1.714v5.143h-1.714V6.571zm5.143 0h-1.714v5.143h1.714V6.571z" />
                        </svg>
                        <span className="text-sm font-semibold">Twitch</span>
                    </a>
                    <a
                        href="https://www.faceit.com/en/organizers/1b5c9ed3-5233-4c58-8761-78f6ef5a0fd9/CrossfireGG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-white hover:bg-[#cc4400] transition-colors"
                    >
                        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 64 64">
                            <polygon points="2,50 62,32 18,32 " />
                        </svg>
                        <span className="text-sm font-semibold">FACEIT</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
