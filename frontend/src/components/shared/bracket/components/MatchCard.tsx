import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MatchTeam } from "./MatchTeam";
import { openInNewTab } from "@/utils/openInNewTab";
import { MatchWithParticipantsDTO } from "@repo/contracts";
import { ExternalLink, Info } from "lucide-react";
import { useMatchDropdown, MatchDropdownPortal } from "./MatchDropdownProvider";

type MatchCardProps = {
    match: MatchWithParticipantsDTO | undefined;
    margin?: boolean;
};

export default function MatchCard({ match, margin }: MatchCardProps) {
    if (margin === undefined) {
        margin = true;
    }

    const navigate = useNavigate();
    const { activeMatchId, openDropdown, closeDropdown, anchorRect } =
        useMatchDropdown();
    const triggerRef = useRef<HTMLDivElement>(null);

    const isOpen = match && activeMatchId === match.id;

    const team1 = match?.participants?.[0]?.stageTeam?.team;
    const team2 = match?.participants?.[1]?.stageTeam?.team;

    const handleToggle = (e: React.MouseEvent) => {
        if (!match) return;
        if (isOpen) {
            closeDropdown();
        } else if (triggerRef.current) {
            openDropdown(match.id, triggerRef.current);
        }
    };

    return (
        <div
            ref={triggerRef}
            className={`group border-border bg-firstBg text-textPrimary relative flex grow flex-col overflow-hidden border transition-all duration-200 ${
                margin
                    ? "m-2 rounded-md"
                    : "rounded-tr-md rounded-br-md rounded-bl-md"
            } ${isOpen ? "ring-2 ring-blue-500/50" : ""}`}
        >
            <div className="cursor-pointer" onClick={handleToggle}>
                <MatchTeam
                    team={team1}
                    winner={match?.participants?.[0]?.winner}
                    score={match?.participants?.[0]?.score}
                />
                <MatchTeam
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
                            top: `${anchorRect.bottom + 4}px`,
                            left: `${anchorRect.left + anchorRect.width / 2}px`,
                            transform: "translateX(-50%)",
                            zIndex: 9999,
                        }}
                        className="border-border bg-firstBg animate-in fade-in slide-in-from-top-1 rounded-md border p-3 whitespace-nowrap shadow-xl duration-200"
                    >
                        <div className="mb-3 flex items-center justify-between px-1">
                            <span className="text-textSecondary text-xs font-bold tracking-wider uppercase">
                                {team1?.name || "TBD"} vs {team2?.name || "TBD"}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (match.faceit_url) {
                                        openInNewTab(match.faceit_url);
                                    }
                                }}
                                className="flex items-center justify-center gap-2 rounded bg-white/5 px-4 py-2 text-xs font-bold transition-colors hover:bg-white/10 disabled:opacity-50"
                                disabled={!match.faceit_url}
                            >
                                <ExternalLink className="h-3.3 w-3.3" />
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
                                className="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-xs font-bold transition-colors hover:bg-blue-700"
                            >
                                <Info className="h-3.3 w-3.3" />
                                Match Page
                            </button>
                        </div>
                    </div>
                </MatchDropdownPortal>
            )}
        </div>
    );
}
