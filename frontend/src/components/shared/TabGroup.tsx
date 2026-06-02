import { cn } from "@/utils/cn";
import type { AppRouteParams, AppRouteTo } from "@/lib/router.types";
import { Link, useMatchRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";

export interface Tab {
    nav: { to: AppRouteTo; params?: AppRouteParams };
    preload?: boolean;
    label: string;
    icon?: any;
    exact: boolean;
}

type TabGroupProps = {
    tabs: Tab[];
    trailing?: ReactNode;
};

export default function TabGroup({ tabs, trailing }: TabGroupProps) {
    const matchRoute = useMatchRoute();
    const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const isActiveTab = (to: AppRouteTo, params: AppRouteParams | undefined, exact: boolean) => {
        if (exact) {
            return matchRoute({ to, params }) !== false;
        }
        return matchRoute({ to, params, fuzzy: true }) !== false;
    };

    const activeIndex = tabs.findIndex((tab) =>
        isActiveTab(tab.nav.to, tab.nav.params, tab.exact),
    );

    useLayoutEffect(() => {
        const el = tabsRef.current[activeIndex];
        if (!el || !containerRef.current) return;
        setIndicator({
            left: el.offsetLeft,
            width: el.offsetWidth,
            opacity: 1,
        });
    }, [activeIndex]);

    return (
        <div className="flex flex-col justify-between gap-6 border-b border-white sm:flex-row sm:items-center">
            <div ref={containerRef} className="relative flex min-w-0 flex-1 gap-2">
                <span
                    className="pointer-events-none absolute inset-y-0 mb-2 rounded-md bg-gray-400/20 transition-[left,width] duration-300 ease-in-out"
                    style={indicator}
                />
                {tabs.map((tab: Tab, i: number) => (
                    <Link
                        key={tab.nav.to}
                        ref={(el: HTMLAnchorElement | null) => {
                            tabsRef.current[i] = el;
                        }}
                        to={tab.nav.to}
                        {...(tab.nav.params ? { params: tab.nav.params } : {})}
                        preload={tab.preload && "intent"}
                        className={cn(
                            "relative z-10 mb-2 flex items-center gap-2.5 rounded-md px-4 py-2 text-sm font-black transition-colors",
                            activeIndex === i
                                ? "text-textPrimary"
                                : "text-textSecondary hover:text-textPrimary",
                        )}
                    >
                        {tab.icon && <tab.icon size={18} />}
                        {tab.label}
                    </Link>
                ))}
            </div>
            {trailing != null && trailing !== false ? (
                <div className="mb-2 flex shrink-0 items-center justify-start sm:justify-end">
                    {trailing}
                </div>
            ) : null}
        </div>
    );
}
