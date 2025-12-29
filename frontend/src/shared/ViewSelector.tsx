import { useRef, useEffect, useState } from "react";

type ViewOption = {
    key: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
};

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
    const containerRef = useRef<HTMLDivElement>(null);
    const activeButtonRef = useRef<HTMLButtonElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<{
        left: number;
        width: number;
    }>({ left: 0, width: 0 });

    useEffect(() => {
        const updateIndicator = () => {
            const containerLeft =
                containerRef.current?.getBoundingClientRect().left || 0;
            const buttonRect = activeButtonRef.current?.getBoundingClientRect();

            if (buttonRect) {
                setIndicatorStyle({
                    left: buttonRect.left - containerLeft,
                    width: buttonRect.width,
                });
            }
        };

        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [currentView]);

    return (
        <div
            ref={containerRef}
            className={`bg-firstBg relative inline-flex overflow-hidden rounded-md shadow-md ${className}`}
        >
            <div
                className="absolute bottom-0 h-1 bg-orange-500 transition-all duration-300 ease-in-out"
                style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                }}
            />
            {views.map((view) => (
                <button
                    key={view.key}
                    ref={currentView === view.key ? activeButtonRef : null}
                    onClick={() => onViewChange(view.key)}
                    disabled={view.disabled}
                    className={`flex min-w-32 items-center justify-center gap-2 px-6 py-4 text-xl font-bold transition-colors duration-200 ${
                        currentView === view.key
                            ? "text-blue-500"
                            : "text-textSecondary"
                    } ${
                        view.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "hover:text-blue-500"
                    }`}
                >
                    {view.icon && <span className="text-lg">{view.icon}</span>}
                    {view.label}
                </button>
            ))}
        </div>
    );
}
