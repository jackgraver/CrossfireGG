"use client";

import { useRouter } from "next/navigation";
import type { Match } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";
import { openInNewTab } from "@/lib/NewTab";

type MatchCardProps = {
    match: Match | undefined;
    margin?: boolean;
};

export default function MatchCard({ match, margin }: MatchCardProps) {
    if (margin === undefined) {
        margin = true;
    }

    const router = useRouter();
    return (
        <div
            className={`group relative flex grow flex-col border border-border bg-firstBg text-textPrimary ${
                margin
                    ? "m-2 rounded-md"
                    : "rounded-bl-md rounded-br-md rounded-tr-md"
            }`}
        >
            <MatchTeam
                team={match?.teams.team1}
                winner={
                    match
                        ? match?.winner === match?.teams.team1.team_id
                        : undefined
                }
                score={match?.team1_score}
            />
            <MatchTeam
                team={match?.teams.team2}
                winner={
                    match
                        ? match?.winner === match?.teams.team2.team_id
                        : undefined
                }
                score={match?.team2_score}
            />

            {match && (
                <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                        onClick={() => {
                            if (match?.faceit_url) {
                                openInNewTab(match.faceit_url);
                            }
                        }}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                    >
                        <img src="/faceit.png" alt="F" className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => router.push(`/match/${match?.match_id}`)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                    >
                        <img src="/OSSLOGO.png" alt="OSS" className="h-8 w-8" />
                    </button>
                </div>
            )}
        </div>
    );
}
