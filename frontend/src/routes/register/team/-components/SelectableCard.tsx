import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { MoveUpRight, Plus } from "lucide-react";
import { useSelectableCardGroup } from "./SelectableCardGroup";

type SelectableCardProps = {
    element: any;
    avatar: string;
    name: string;
    disabled?: boolean;
    disabledAction?: {
        label: string;
        onClick: () => void;
    };
};

export default function SelectableCard({
    element,
    avatar,
    name,
    disabled = false,
    disabledAction,
}: SelectableCardProps) {
    const { toggle, isSelected, canSelectMore, max } = useSelectableCardGroup();
    const selected = isSelected(element);
    const isSingleSelect = max === 1;
    const isClickable =
        !disabled && (isSingleSelect || selected || canSelectMore);

    const handleClick = () => {
        if (isClickable) {
            toggle(element);
        }
    };

    return (
        <div className="flex w-full flex-col items-center pr-2">
            <div
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleClick();
                    }
                }}
                role="button"
                tabIndex={0}
                className={`group grid w-full grid-cols-[48px_1fr_32px] items-center rounded-lg border p-2 transition-colors duration-150 ${
                    disabled
                        ? "bg-thirdBg cursor-not-allowed opacity-50"
                        : isClickable
                          ? "hover:bg-secondBg cursor-pointer"
                          : "cursor-not-allowed opacity-70"
                } ${selected ? "bg-secondBg/80 border-green-500" : "border-secondBg"}`}
            >
                <TeamLogo
                    avatar={avatar ?? "/oss-logo-placeholder.png"}
                    styling="h-12 w-12 rounded-full object-cover"
                />
                <p className="px-3 text-lg font-medium">{name}</p>
                <div className="ml-auto flex h-7 w-7 items-center justify-center">
                    {!disabled && (
                        <>
                            {/* {selected ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <Circle
                                    className={`h-5 w-5 ${disabled ? "text-gray-500" : "text-gray-400"}`}
                                />
                            )} */}
                            <Plus className="h-6 w-6 text-green-500" />
                        </>
                    )}
                </div>
            </div>
            {disabled && disabledAction && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        disabledAction.onClick();
                    }}
                    className="flex w-[95%] items-center justify-center rounded-b-md bg-green-700 px-3 py-1 text-sm font-bold text-gray-100 transition-colors hover:bg-green-800 hover:text-white"
                >
                    {disabledAction.label}
                    <MoveUpRight className="ml-1 h-5 w-5" />
                </button>
            )}
        </div>
    );
}
