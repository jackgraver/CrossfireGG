import { useNavigate } from "@tanstack/react-router";
import { MatchTeam } from "./MatchTeam";
import { openInNewTab } from "@/utils/openInNewTab";
import { MatchWithParticipantsDTO } from "@repo/contracts";

type MatchCardProps = {
    match: MatchWithParticipantsDTO | undefined;
    margin?: boolean;
};

export default function MatchCard({ match, margin }: MatchCardProps) {
    if (margin === undefined) {
        margin = true;
    }

    const navigate = useNavigate();

    // if (!match) {
    //     return <h1>No Match</h1>;
    // }

    return (
        <div
            className={`group border-border bg-firstBg text-textPrimary relative flex grow flex-col border ${
                margin ? "m-2 rounded-md" : "rounded-tr-md rounded-br-md rounded-bl-md"
            }`}
        >
            <MatchTeam
                team={match?.participants![0].stageTeam.team!}
                winner={match?.participants![0].winner}
                score={match?.participants![0].score}
            />
            <MatchTeam
                team={match?.participants![1].stageTeam.team}
                winner={match?.participants![1].winner}
                score={match?.participants![1].score}
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
                        onClick={() => navigate({ to: `/match/${match?.id}` })}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                    >
                        <img src="/OSSLOGO.png" alt="OSS" className="h-8 w-8" />
                    </button>
                </div>
            )}
        </div>
    );
}
