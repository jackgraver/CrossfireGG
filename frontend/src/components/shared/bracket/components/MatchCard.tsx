import { useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MatchTeam } from "./MatchTeam";
import { openInNewTab } from "@/utils/openInNewTab";
import { MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";
import { ExternalLink, Info } from "lucide-react";
import { useMatchDropdown, MatchDropdownPortal } from "./MatchDropdownProvider";
import { cn } from "@/utils/cn";
import { formatScheduledDate } from "@/lib/date.utils";

type MatchCardProps = {
    match: MatchWithParticipantAndMinifiedMapsDTO | undefined;
    margin?: boolean;
    unroundedTop?: boolean;
    /** Narrow columns: full width + shrink + truncated team names */
    bracketLayout?: boolean;
};

export default function MatchCard({ match, margin, unroundedTop, bracketLayout }: MatchCardProps) {
    if (margin === undefined) {
        margin = true;
    }

    const navigate = useNavigate();
    const { activeMatchId, openDropdown, closeDropdown, anchorRect } = useMatchDropdown();
    const triggerRef = useRef<HTMLDivElement>(null);

    const isOpen = match && activeMatchId === match.id;

    const team1 = match?.participants?.[0]?.stageTeam?.team;
    const team2 = match?.participants?.[1]?.stageTeam?.team;

    const handleToggle = (_: React.MouseEvent) => {
        if (!match) return;
        if (isOpen) {
            closeDropdown();
        } else if (triggerRef.current) {
            openDropdown(match.id, triggerRef.current);
        }
    };

    const teamVariant = bracketLayout ? "bracket" : "default";

    if (!match) {
        return (
            <div
                className={cn(
                    `group border-border bg-firstBg text-textPrimary relative flex grow flex-col overflow-hidden border transition-all duration-200`,
                    margin ? "m-2 rounded-md" : "rounded-md",
                    isOpen ? "ring-2 ring-blue-500/50" : "",
                    unroundedTop && "rounded-tl-none border-t-0",
                    bracketLayout && "w-full min-w-0 max-w-full",
                )}
            >
                <div
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={handleToggle}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleToggle(e as unknown as React.MouseEvent);
                        }
                    }}
                >
                    <MatchTeam variant={teamVariant} team={team1} winner={undefined} score={0} />
                    <MatchTeam variant={teamVariant} team={team2} winner={undefined} score={0} />
                </div>
            </div>
        );
    }

    if (
        ["Reborn", "team mouse"].includes(match.participants[0].stageTeam.team.name) &&
        ["Reborn", "team mouse"].includes(match.participants[1].stageTeam.team.name)
    ) {
        console.log("match", match);
    }

    return (
        <div
            ref={triggerRef}
            className={cn(
                `group border-border bg-firstBg text-textPrimary relative flex grow flex-col overflow-hidden border transition-all duration-200`,
                margin ? "m-2 rounded-md" : "rounded-md",
                isOpen ? "ring-2 ring-blue-500/50" : "",
                unroundedTop && "rounded-tl-none",
                bracketLayout && "w-full min-w-0 max-w-full",
            )}
        >
            <div
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={handleToggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleToggle(e as unknown as React.MouseEvent);
                    }
                }}
            >
                <MatchTeam
                    variant={teamVariant}
                    team={team1}
                    winner={match?.participants?.[0]?.winner}
                    score={match?.participants?.[0]?.score}
                />
                <MatchTeam
                    variant={teamVariant}
                    team={team2}
                    winner={match?.participants?.[1]?.winner}
                    score={match?.participants?.[1]?.score}
                />
            </div>
            {isOpen && match && anchorRect && (
                <MatchDropdownPortal>
                    <div
                        style={{
                            position: "absolute",
                            top: `${anchorRect.bottom + 8}px`,
                            left: `${anchorRect.left + anchorRect.width / 2}px`,
                            transform: "translateX(-50%)",
                            zIndex: 9999,
                        }}
                        className="border-border bg-firstBg animate-in fade-in slide-in-from-top-2 flex min-w-70 flex-col gap-4 rounded-lg border p-4 shadow-2xl duration-200"
                    >
                        <div
                            className={cn(
                                "flex flex-col gap-3 border-b border-white/5 pb-3",
                                match.maps.length === 0 && "border-none pb-0",
                            )}
                        >
                            <div className="flex justify-center">
                                <span className="text-textSecondary text-[10px] font-medium tracking-wider uppercase">
                                    {formatScheduledDate(match.scheduled_at!)}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Link
                                    to="/team/$team_id"
                                    params={{
                                        team_id: team1!.id.toString(),
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeDropdown();
                                    }}
                                    className="text-textPrimary min-w-0 truncate text-left text-sm font-bold"
                                >
                                    {team1?.short_name}
                                </Link>
                                <span className="text-textSecondary text-center text-sm font-bold">
                                    -
                                </span>
                                <Link
                                    to="/team/$team_id"
                                    params={{
                                        team_id: team2!.id.toString(),
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeDropdown();
                                    }}
                                    className="text-textPrimary min-w-0 truncate text-right text-sm font-bold"
                                >
                                    {team2?.short_name}
                                </Link>
                            </div>
                        </div>
                        {match.maps.length > 0 && (
                            <div className="flex flex-col gap-2">
                                {match.maps.map((map) => (
                                    <div
                                        key={map.id}
                                        className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2"
                                    >
                                        <span
                                            className={cn(
                                                "w-8 text-center text-xs font-bold",
                                                map.winner_id === match?.participants?.[0].id
                                                    ? "text-green-500"
                                                    : "text-textSecondary",
                                            )}
                                        >
                                            {map.team1_score}
                                        </span>
                                        <span className="h-3 w-px bg-white/10" />
                                        <span className="text-textPrimary grow text-center text-xs font-medium">
                                            {map.map_name}
                                        </span>
                                        <span className="h-3 w-px bg-white/10" />
                                        <span
                                            className={cn(
                                                "w-8 text-center text-xs font-bold",
                                                map.winner_id === match?.participants?.[1].id
                                                    ? "text-green-500"
                                                    : "text-textSecondary",
                                            )}
                                        >
                                            {map.team2_score}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-row gap-2 pt-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (match.faceit_url) {
                                        openInNewTab(match.faceit_url);
                                    }
                                }}
                                className="text-textPrimary flex w-full items-center justify-center gap-2 rounded-md bg-white/5 py-2.5 text-xs font-bold transition-all hover:bg-white/10 active:scale-[0.98] disabled:opacity-50"
                                disabled={!match.faceit_url}
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                View on Faceit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate({
                                        to: "/match/$match_id",
                                        params: {
                                            match_id: match.id.toString(),
                                        },
                                    });
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
                            >
                                <Info className="h-3.5 w-3.5" />
                                Match Page
                            </button>
                        </div>
                    </div>
                </MatchDropdownPortal>
            )}
        </div>
    );
}
