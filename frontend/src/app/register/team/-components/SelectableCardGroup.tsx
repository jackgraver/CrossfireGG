import { createContext, useContext, ReactNode } from "react";

type SelectableCardContextValue = {
    selectedElements: any[];
    min: number;
    max: number;
    toggle: (element: any) => void;
    isSelected: (id: string) => boolean;
    canSelectMore: boolean;
    isValid: boolean;
};

const SelectableCardContext = createContext<SelectableCardContextValue | null>(
    null,
);

export function useSelectableCardGroup() {
    const context = useContext(SelectableCardContext);
    if (!context) {
        throw new Error(
            "SelectableCard must be used within a SelectableCardGroup",
        );
    }
    return context;
}

type SelectableCardGroupProps = {
    children: ReactNode;
    min?: number;
    max?: number;
    selectedElements: any[];
    onChange: (ids: string[]) => void;
};

export function SelectableCardGroup({
    children,
    min = 0,
    max = Infinity,
    selectedElements,
    onChange,
}: SelectableCardGroupProps) {
    const toggle = (element: any) => {
        onChange(element);
        // if (value.includes(id)) {
        //     onChange(value.filter((v) => v !== id));
        // } else {
        //     if (max === 1) {
        //         onChange([id]);
        //     } else if (value.length < max) {
        //         onChange([...value, id]);
        //     }
        // }
    };

    const isSelected = (element: any) => {
        const elementId = element.user_id || element.faceitId || element.id || element.team_id;
        return selectedElements.some((selected: any) => {
            const selectedId = selected.faceitId || selected.user_id || selected.id || selected.teamId || selected.team_id;
            return selectedId === elementId;
        });
    };
    const canSelectMore = selectedElements.length < max;
    const isValid = selectedElements.length >= min && selectedElements.length <= max;

    return (
        <SelectableCardContext.Provider
            value={{
                selectedElements: selectedElements,
                min,
                max,
                toggle,
                isSelected,
                canSelectMore,
                isValid,
            }}
        >
            <div className="flex w-full flex-col gap-2">{children}</div>
        </SelectableCardContext.Provider>
    );
}
