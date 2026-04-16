import type { LucideIcon } from "lucide-react";
import { Key, Swords, Trophy, Users } from "lucide-react";
import SectionTitle from "./SectionTitle";

const steps: {
    num: string;
    Icon: LucideIcon;
    title: string;
    description: string;
}[] = [
    {
        num: "1",
        Icon: Key,
        title: "Sign In with FACEIT",
        description:
            "Connect your FACEIT account to get started. We use FACEIT for anti-cheat and match management.",
    },
    {
        num: "2",
        Icon: Users,
        title: "Build Your Squad",
        description:
            "Register your team of 5 players. Make sure everyone is VRS compliant to be eligible for the season.",
    },
    {
        num: "3",
        Icon: Swords,
        title: "Compete in Stages",
        description:
            "Battle through group stages and advance to single-elimination playoffs. Best of 3 matches all the way.",
    },
    {
        num: "4",
        Icon: Trophy,
        title: "Win the Crown",
        description:
            "Top teams split the $3,000+ prize pool. The champion takes the largest share and eternal bragging rights.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="w-full pb-16">
            <div className="mb-10 text-left">
                <SectionTitle title="JOIN THE BATTLE" subtitle="HOW IT WORKS" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-firstBg/80">
                <div className="flex w-full flex-row divide-x divide-white/10 overflow-x-auto">
                    {steps.map(({ num, Icon, title, description }) => (
                        <div
                            key={num}
                            className="flex min-w-36 flex-1 flex-col items-start p-4 sm:p-6 lg:p-8"
                        >
                            <div className="flex flex-row items-center gap-2 w-full mb-8">
                            <span className="flex-1 text-5xl font-bold leading-none text-orange-600/35 sm:text-6xl">
                                {num}
                            </span>
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center  `}
                            >
                                <Icon className="h-10 w-10" strokeWidth={1.75} />
                            </div>
                                </div>
                           
                            <h3 className="text-xl font-extrabold text-white mb-2">{title}</h3>
                            <p className="text-sm leading-relaxed text-textSecondary">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
