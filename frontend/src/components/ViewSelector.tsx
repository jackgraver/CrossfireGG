import { useState, useCallback } from "react";
import TabButton from "./buttons/TabButton";

/**
 * Configuration for a view option in the selector
 */
type ViewOption = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
};

/**
 * A generic view selector component that creates a tabbed interface.
 *
 * @example
 * ```tsx
 * const viewOptions = [
 *   { key: "home", label: "Home", icon: "🏠" },
 *   { key: "profile", label: "Profile", icon: "👤" },
 *   { key: "settings", label: "Settings", disabled: true }
 * ];
 *
 * <ViewSelector
 *   views={viewOptions}
 *   currentView="home"
 *   onViewChange={(view) => setCurrentView(view)}
 * />
 * ```
 */
type ViewSelectorProps = {
    views: ViewOption[];
    currentView: string;
    onViewChange: (view: string) => void;
    className?: string;
};

export default function ViewSelector({
    views,
    currentView,
    onViewChange,
    className = "",
}: ViewSelectorProps) {
    const [buttonWidths, setButtonWidths] = useState<number[]>([]);
    const currentIndex = views.findIndex((v) => v.key === currentView);

    const handleWidthChange = useCallback((index: number, width: number) => {
        setButtonWidths((prev) => {
            const newWidths = [...prev];
            newWidths[index] = width;
            return newWidths;
        });
    }, []);

    // Calculate indicator position and width based on actual button widths
    const getIndicatorStyle = () => {
        if (buttonWidths.length === 0 || currentIndex === -1) {
            return { width: "0px", left: "0px" };
        }

        const totalWidth = buttonWidths.reduce((sum, width) => sum + width, 0);
        const leftPosition = buttonWidths
            .slice(0, currentIndex)
            .reduce((sum, width) => sum + width, 0);
        const currentButtonWidth = buttonWidths[currentIndex] || 0;

        return {
            width: `${currentButtonWidth}px`,
            left: `${leftPosition}px`,
        };
    };

    return (
        <div
            className={`relative inline-flex bg-white rounded-md overflow-hidden shadow-md ${className}`}
        >
            <div
                className="absolute bottom-0 h-1 bg-orange-500 transition-all duration-300 ease-in-out"
                style={getIndicatorStyle()}
            />
            {views.map((view, index) => (
                <TabButton
                    key={view.key}
                    label={view.label}
                    isActive={currentView === view.key}
                    onClick={() => onViewChange(view.key)}
                    disabled={view.disabled}
                    icon={view.icon}
                    onWidthChange={(width) => handleWidthChange(index, width)}
                />
            ))}
        </div>
    );
}
