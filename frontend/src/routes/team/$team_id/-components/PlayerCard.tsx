import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { PlayerDTO } from "@repo/contracts";

export default function PlayerCard({
    player,
    isCaptain,
    stageBadges,
}: {
    player: PlayerDTO;
    isCaptain?: boolean;
    stageBadges?: { stage_name: string; tournament_name: string }[];
}) {
    return (
        <div className="border-border bg-secondBg flex items-center gap-4 rounded-lg border p-4">
            <TeamLogo
                avatar={player.player_logo ?? undefined}
                styling="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-textPrimary truncate font-semibold">
                        {player.player_name}
                    </span>
                    {isCaptain && (
                        <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-400">
                            Captain
                        </span>
                    )}
                    {player.base_role === "starter" && (
                        <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-medium text-green-400">
                            Starter
                        </span>
                    )}
                    {player.base_role === "sub" && (
                        <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-xs font-medium text-blue-400">
                            Sub
                        </span>
                    )}
                    {player.base_role === "coach" && (
                        <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-500">
                            Coach
                        </span>
                    )}
                </div>
                {stageBadges && stageBadges.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {stageBadges.map((badge, idx) => (
                            <span
                                key={idx}
                                className="bg-thirdBg text-textSecondary rounded px-1.5 py-0.5 text-xs"
                                title={badge.tournament_name}
                            >
                                {badge.stage_name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {player.faceit_id && (
                <a
                    href={`https://www.faceit.com/en/players/${player.player_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-textPrimary shrink-0 text-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    FACEIT →
                </a>
            )}
        </div>
    );
}
