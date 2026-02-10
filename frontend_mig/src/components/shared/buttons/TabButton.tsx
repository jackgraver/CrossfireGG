import { useRef, useEffect } from "react";

/**
 * A reusable tab button component for view/tab switching functionality.
 *
 * @param label - The text to display on the button
 * @param isActive - Whether this tab is currently selected
 * @param onClick - Function to call when the button is clicked
 * @param className - Additional CSS classes to apply
 * @param disabled - Whether the button should be disabled
 * @param icon - Optional icon to display before the label
 * @param onWidthChange - Callback to report button width changes
 */
type TabButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    onWidthChange?: (width: number) => void;
};

export default function TabButton({
    label,
    isActive,
    onClick,
    className = "",
    disabled = false,
    icon,
    onWidthChange,
}: TabButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            const width = buttonRef.current?.offsetWidth || 0;
            onWidthChange?.(width);
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, [onWidthChange, label, icon]);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            disabled={disabled}
            className={`flex min-w-32 items-center justify-center gap-2 px-6 py-4 text-xl font-bold transition-colors duration-200 ${
                isActive ? "text-blue-600" : "text-gray-400"
            } ${disabled ? "cursor-not-allowed opacity-50" : "hover:text-blue-500"} ${className}`}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {label}
        </button>
    );
}
