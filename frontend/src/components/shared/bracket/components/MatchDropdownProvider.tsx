import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface MatchDropdownContextType {
    activeMatchId: number | string | null;
    openDropdown: (id: number | string, anchor: HTMLElement) => void;
    closeDropdown: () => void;
    anchorRect: {
        top: number;
        left: number;
        bottom: number;
        width: number;
    } | null;
}

const MatchDropdownContext = createContext<MatchDropdownContextType | undefined>(undefined);

export const useMatchDropdown = () => {
    const context = useContext(MatchDropdownContext);
    if (!context) {
        throw new Error("useMatchDropdown must be used within a MatchDropdownProvider");
    }
    return context;
};

export const MatchDropdownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeMatchId, setActiveMatchId] = useState<number | string | null>(null);
    const [anchorRect, setAnchorRect] = useState<{
        top: number;
        left: number;
        bottom: number;
        width: number;
    } | null>(null);
    const anchorRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateRect = useCallback(() => {
        if (anchorRef.current && containerRef.current) {
            const anchor = anchorRef.current.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            // Calculate coordinates relative to our relative provider container
            // This ensures the dropdown scrolls naturally with the container
            setAnchorRect({
                top: anchor.top - container.top,
                bottom: anchor.bottom - container.top,
                left: anchor.left - container.left,
                width: anchor.width,
            });
        }
    }, []);

    const openDropdown = useCallback((id: number | string, anchor: HTMLElement) => {
        anchorRef.current = anchor;
        setActiveMatchId(id);

        if (containerRef.current) {
            const anchorBounds = anchor.getBoundingClientRect();
            const containerBounds = containerRef.current.getBoundingClientRect();
            setAnchorRect({
                top: anchorBounds.top - containerBounds.top,
                bottom: anchorBounds.bottom - containerBounds.top,
                left: anchorBounds.left - containerBounds.left,
                width: anchorBounds.width,
            });
        }
    }, []);

    const closeDropdown = useCallback(() => {
        setActiveMatchId(null);
        setAnchorRect(null);
        anchorRef.current = null;
    }, []);

    useEffect(() => {
        if (!activeMatchId) return;

        const handleResize = () => updateRect();
        const handleClickOutside = (e: MouseEvent) => {
            if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
                const portalContent = document.getElementById("match-dropdown-portal");
                if (portalContent && !portalContent.contains(e.target as Node)) {
                    closeDropdown();
                }
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDropdown();
        };

        // We only need resize now, scroll is handled by absolute positioning in a relative container
        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeMatchId, closeDropdown, updateRect]);

    return (
        <MatchDropdownContext.Provider
            value={{ activeMatchId, openDropdown, closeDropdown, anchorRect }}
        >
            <div ref={containerRef} className="relative">
                {children}
                <div id="match-dropdown-portal" className="absolute top-0 left-0 w-full" />
            </div>
        </MatchDropdownContext.Provider>
    );
};

export const MatchDropdownPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const portalRoot = document.getElementById("match-dropdown-portal");
    if (!portalRoot) return null;
    return createPortal(children, portalRoot);
};
