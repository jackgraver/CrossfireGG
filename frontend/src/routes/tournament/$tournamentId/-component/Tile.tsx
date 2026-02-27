import { cn } from "@/utils/cn";

export default function Tile({
    icon: Icon,
    label,
    bg = "bg-gray-500/10",
    text = "bg-gray-600",
}: {
    icon: any;
    label: string;
    bg: string;
    text: string;
}) {
    return (
        <span
            className={cn(
                bg ? bg : "",
                text ? text : "",
                "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold",
            )}
        >
            <Icon size={12} />
            {label}
        </span>
    );
}
