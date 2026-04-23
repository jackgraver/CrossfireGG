export default function AboutHero() {
    return (
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <p className="flex-1 text-left text-lg font-medium text-textSecondary">
                CROSSFIRE is a North American Counter-Strike 2 (CS2) esports league and competitive
                platform that provides structured, high-level tournaments for semi-pro and aspiring
                teams. It runs season-based leagues with organized formats like round-robin group
                stages and playoff brackets, offering consistent scheduling, best-of-three matches,
                and prize pools to mirror a professional competitive environment. In addition to its
                leagues, CROSSFIRE also hosts active 10 mans through its community hubs, giving
                players a place to practice, compete daily, and stay sharp outside of official
                matches.
            </p>
            <div className="flex w-full shrink-0 items-center justify-center lg:w-[45%]">
                <img
                    src="/crossfire.png"
                    alt="Crossfire Logo"
                    className="w-full max-w-md object-contain lg:max-w-full"
                />
            </div>
        </div>
    );
}
