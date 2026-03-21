import Tile from "@/routes/tournament/$tournamentId/-component/Tile";
import { cn } from "@/utils/cn";
import * as Popover from "@radix-ui/react-popover";
import type { LucideIcon } from "lucide-react";

const MAX_VISIBLE = 3;

export type AchievementTileItem = {
    icon: LucideIcon;
    label: string;
    bg: string;
    text: string;
};

export default function AchievementTilesRow({
    items,
}: {
    items: AchievementTileItem[];
}) {
    if (items.length === 0) {
        return null;
    }

    const visible = items.slice(0, MAX_VISIBLE);
    const overflow = items.slice(MAX_VISIBLE);
    const hasOverflow = overflow.length > 0;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {visible.map((item, i) => (
                <Tile
                    key={`${item.label}-${i}`}
                    icon={item.icon}
                    label={item.label}
                    bg={item.bg}
                    text={item.text}
                />
            ))}
            {hasOverflow && (
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button
                            type="button"
                            className="text-textSecondary hover:text-textPrimary hover:bg-secondBg rounded-md px-2 py-1 text-xs font-semibold transition-colors"
                        >
                            View all ({overflow.length})
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            align="start"
                            sideOffset={6}
                            collisionPadding={12}
                            className={cn(
                                "border-border bg-firstBg z-50 max-h-72 w-fit overflow-y-auto rounded-lg border p-3 shadow-xl",
                                "animate-in fade-in duration-200",
                            )}
                        >
                            <ul className="flex flex-col gap-2">
                                {overflow.map((item, i) => (
                                    <li
                                        key={`${item.label}-${i + MAX_VISIBLE}`}
                                    >
                                        <Tile
                                            icon={item.icon}
                                            label={item.label}
                                            bg={item.bg}
                                            text={item.text}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            )}
        </div>
    );
}
