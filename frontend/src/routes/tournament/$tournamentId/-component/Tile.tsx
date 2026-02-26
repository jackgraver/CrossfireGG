import { cn } from "@/utils/cn";

export default function Tile({
    icon: Icon,
    label,
    color,
    fade = 10,
}: {
    icon: any;
    label: string;
    color: string;
    fade?: number;
}) {
    return (
        <span
            className={cn(
                "bg-" + color + "/" + fade,
                "text-" + color,
                "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold",
            )}
        >
            <Icon size={12} />
            {label}
        </span>
    );
}
