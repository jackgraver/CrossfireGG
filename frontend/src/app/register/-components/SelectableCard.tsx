import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { Check, Circle } from "lucide-react";
import { useSelectableCardGroup } from "./SelectableCardGroup";

type SelectableCardProps = {
    id: string;
    avatar: string;
    name: string;
    disabled?: boolean;
};

export default function SelectableCard({
    id,
    avatar,
    name,
    disabled = false,
}: SelectableCardProps) {
    const { toggle, isSelected, canSelectMore, max } = useSelectableCardGroup();
    const selected = isSelected(id);
    const isSingleSelect = max === 1;
    const isClickable =
        !disabled && (isSingleSelect || selected || canSelectMore);

    const handleClick = () => {
        if (isClickable) {
            toggle(id);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`group grid w-full grid-cols-[48px_1fr_32px] items-center rounded-md border p-2 transition-colors duration-150 ${
                disabled
                    ? "cursor-not-allowed bg-gray-700 opacity-50"
                    : isClickable
                      ? "cursor-pointer hover:bg-gray-700"
                      : "cursor-not-allowed opacity-70"
            } ${selected ? "border-green-500 bg-gray-700/50" : "border-gray-600"}`}
        >
            <TeamLogo
                avatar={avatar}
                styling="h-12 w-12 rounded object-cover"
            />
            <p className="px-3 text-lg font-medium">{name}</p>
            <div className="ml-auto flex h-7 w-7 items-center justify-center">
                {selected ? (
                    <Check className="h-5 w-5 text-green-500" />
                ) : (
                    <Circle
                        className={`h-5 w-5 ${disabled ? "text-gray-500" : "text-gray-400"}`}
                    />
                )}
            </div>
        </div>
    );
}
