import {
    upcomingMatchChangeLabel,
    UpcomingMatchChange,
} from "@/lib/upcomingMatchDiff.utils";
import { cn } from "@/utils/cn";

type UpcomingMatchChangeBadgeProps = {
    change: UpcomingMatchChange;
};

const badgeStyles: Record<UpcomingMatchChange, string> = {
    finished: "border-white/20 bg-white/10 text-textSecondary",
    cancelled: "border-white/20 bg-white/10 text-textSecondary",
    now_live: "border-green-500/30 bg-green-500/10 text-green-400",
    score_updated: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    newly_visible: "border-orange-500/30 bg-orange-500/10 text-orange-400",
};

export default function UpcomingMatchChangeBadge({ change }: UpcomingMatchChangeBadgeProps) {
    return (
        <div
            className={cn(
                "w-fit rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
                badgeStyles[change],
            )}
        >
            {upcomingMatchChangeLabel(change)}
        </div>
    );
}
