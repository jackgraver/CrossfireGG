import { createContext, useContext, ReactNode } from "react";

type SelectableCardContextValue = {
    selectedIds: string[];
    min: number;
    max: number;
    toggle: (id: string) => void;
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
    value: string[];
    onChange: (ids: string[]) => void;
};

export function SelectableCardGroup({
    children,
    min = 0,
    max = Infinity,
    value,
    onChange,
}: SelectableCardGroupProps) {
    const toggle = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id));
        } else {
            if (max === 1) {
                onChange([id]);
            } else if (value.length < max) {
                onChange([...value, id]);
            }
        }
    };

    const isSelected = (id: string) => value.includes(id);
    const canSelectMore = value.length < max;
    const isValid = value.length >= min && value.length <= max;

    return (
        <SelectableCardContext.Provider
            value={{
                selectedIds: value,
                min,
                max,
                toggle,
                isSelected,
                canSelectMore,
                isValid,
            }}
        >
            <div className="w-full">{children}</div>
        </SelectableCardContext.Provider>
    );
}
