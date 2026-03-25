import { Link } from "@tanstack/react-router";
import type { MatchWithParticipantsDTO } from "@repo/contracts";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { formatTimeOnly } from "@/lib/date.utils";
import { cn } from "@/utils/cn";

export default function StageMatchRow({
    match,
}: {
    match: MatchWithParticipantsDTO;
}) {
    const p0 = match.participants[0];
    const p1 = match.participants[1];
    const t0 = p0?.stageTeam.team;
    const t1 = p1?.stageTeam.team;

    const getStatusStyle = () => {
        switch (match.status?.toUpperCase()) {
            case "FINISHED":
                return "bg-green-500/20 text-green-400";
            case "ONGOING":
            case "LIVE":
                return "bg-blue-500/20 text-blue-400";
            case "SCHEDULED":
                return "bg-yellow-500/20 text-yellow-400";
            case "CANCELLED":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-thirdBg text-textSecondary";
        }
    };

    return (
        <Link
            to="/match/$match_id"
            params={{ match_id: String(match.id) }}
            className="group block"
        >
            <div className="border-border hover:border-textSecondary/30 flex flex-col gap-2 rounded-md border p-3 transition-colors">
                <div className="flex items-center gap-2">
                    {match.scheduled_at != null && (
                        <span className="text-textSecondary text-xs">
                            {formatTimeOnly(match.scheduled_at)}
                        </span>
                    )}
                    {match.status && (
                        <span
                            className={cn(
                                "rounded px-1.5 py-0.5 text-xs font-medium",
                                getStatusStyle(),
                            )}
                        >
                            {match.status.toUpperCase()}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <TeamLogo
                            avatar={t0?.team_logo ?? undefined}
                            styling="h-8 w-8 shrink-0 rounded-full"
                        />
                        <span
                            className={cn(
                                "truncate font-medium",
                                p0?.winner && "text-green-400",
                            )}
                        >
                            {t0?.name ?? "TBD"}
                        </span>
                    </div>
                    <span className="shrink-0 text-lg font-semibold tabular-nums">
                        {p0?.score ?? 0} – {p1?.score ?? 0}
                    </span>
                    <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                        <span
                            className={cn(
                                "truncate text-right font-medium",
                                p1?.winner && "text-green-400",
                            )}
                        >
                            {t1?.name ?? "TBD"}
                        </span>
                        <TeamLogo
                            avatar={t1?.team_logo ?? undefined}
                            styling="h-8 w-8 shrink-0 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}
