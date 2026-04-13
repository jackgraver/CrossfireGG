import { MatchWithCastersDTO, MatchWithParticipantsDTO } from "@repo/contracts";
import { useClaimMatch, useUnclaimMatch } from "../-queries/casting.queries";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { formatMatchDate } from "@/lib/date.utils";
import { Link } from "@tanstack/react-router";

const formatMatchTime = (timestamp: number) => {
    return formatMatchDate(timestamp);
};

export default function MatchCastingCard({
    match,
    isClaimed,
}: {
    match: MatchWithCastersDTO | MatchWithParticipantsDTO;
    isClaimed: boolean;
}) {
    const claimMutation = useClaimMatch();
    const unclaimMutation = useUnclaimMatch();

    return (
        <div className="border-border bg-firstBg rounded-lg border p-4">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm text-gray-400">Round:</span>
                        <span className="text-textPrimary font-medium">{match.round}</span>
                        <div className="ml-8">
                            {isClaimed && "casters" in match && (
                                <span className="mt-1 font-medium text-green-400">
                                    Claimed by {match.casters[0].id}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-3 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <TeamLogo
                                team={match.participants[0].stageTeam.team}
                                styling="h-6 w-6 rounded"
                            />
                            <span className="text-textPrimary font-medium">
                                {match.participants[0].stageTeam.team.name}
                            </span>
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div className="flex items-center gap-2">
                            <TeamLogo
                                team={match.participants[1].stageTeam.team}
                                styling="h-6 w-6 rounded"
                            />
                            <span className="text-textPrimary font-medium">
                                {match.participants[1].stageTeam.team.name}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">Scheduled:</div>
                    <div className="text-sm text-gray-400">Status: {match.status}</div>
                </div>
                <div className="flex flex-col gap-2">
                    <Link
                        to={"/match/$match_id"}
                        params={{ match_id: match.id.toString() }}
                        className="text-text bg-secondBg text-textPrimary hover:bg-thirdBg rounded px-3 py-1 text-center text-sm font-bold transition-colors"
                    >
                        View Match
                    </Link>
                    {/* <ProtectedElement roles={["PRODUCTION", "PRODUCTION_LEAD"]}> */}
                    {!isClaimed ? (
                        <button
                            onClick={() => claimMutation.mutate(match.id.toString())}
                            disabled={claimMutation.isPending}
                            className="rounded bg-green-600 px-3 py-1 text-center text-sm font-bold text-white transition-colors hover:bg-green-700 disabled:bg-gray-600"
                        >
                            Claim Match
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                unclaimMutation.mutate(match.id.toString());
                            }}
                            disabled={unclaimMutation.isPending}
                            className="rounded bg-red-600 px-3 py-1 text-center text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:bg-gray-600"
                        >
                            Unclaim Match
                        </button>
                    )}
                    {/* </ProtectedElement> */}
                </div>
            </div>
        </div>
    );
}
