import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const HOME_CONTENT_GUTTER = "mx-auto w-full max-w-8/12";

type HomeSectionProps = {
    children: ReactNode;
    /**
     * `contained` — content lives in the max-width column with section padding.
     * `band` — full-width background strip; content stays in the same column inside.
     */
    variant: "contained" | "band";
    /**
     * `muted` — `bg-secondBg/20` (only for `band`).
     */
    tone?: "default" | "muted";
    /** Full viewport minimum height (typically for `band`). */
    minHeightScreen?: boolean;
    /**
     * `band`: use shorter outer vertical padding (header-style bands). Inner column does not add `py-16`.
     */
    compactPadding?: boolean;
    centered?: boolean;
    className?: string;
    innerClassName?: string;
};

export default function HomeSection({
    children,
    variant,
    tone = "default",
    minHeightScreen = false,
    compactPadding = false,
    centered = false,
    className,
    innerClassName,
}: HomeSectionProps) {
    const inner = (
        <div
            className={cn(
                HOME_CONTENT_GUTTER,
                variant === "contained" && "py-16",
                variant === "band" && !compactPadding && "py-16",
                centered && "text-center",
                innerClassName,
            )}
        >
            {children}
        </div>
    );

    if (variant === "contained") {
        return <div className={className}>{inner}</div>;
    }

    return (
        <section
            className={cn(
                "w-full",
                tone === "muted" && "bg-secondBg/20",
                minHeightScreen && "min-h-screen",
                compactPadding && "py-12 sm:py-16",
                className,
            )}
        >
            {inner}
        </section>
    );
}
