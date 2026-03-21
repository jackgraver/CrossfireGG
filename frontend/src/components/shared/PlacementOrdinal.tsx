import { Medal } from "lucide-react";
import { formatOrdinal, placementMedalClassName } from "@/utils/placement";

export function PlacementOrdinal({ placement }: { placement: number }) {
    const showMedal = placement >= 1 && placement <= 3;
    return (
        <span
            className={`inline-flex items-center gap-1 pt-[6px] text-sm font-semibold ${placementMedalClassName(placement)}`}
        >
            {showMedal && (
                <Medal
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                />
            )}
            {formatOrdinal(placement)}
        </span>
    );
}
