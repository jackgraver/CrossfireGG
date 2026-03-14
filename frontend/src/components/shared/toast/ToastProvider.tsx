import { useCallback, useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { toastService, ToastInstance } from "./toastService";

const PEEK = 8;
const GAP = 10;
const MAX_VISIBLE_STACKED = 4;

export default function ToastProvider() {
    const [toasts, setToasts] = useState<ToastInstance[]>([]);
    const [hovered, setHovered] = useState(false);
    const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const [heights, setHeights] = useState<Record<string, number>>({});

    const remove = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        itemRefs.current.delete(id);
        const t = timeouts.current.get(id);
        if (t) {
            clearTimeout(t);
            timeouts.current.delete(id);
        }
    }, []);

    useEffect(() => {
        const unsub = toastService.subscribe((event) => {
            if (event.type === "show") {
                setToasts((prev) => [...prev, event.toast]);
                if (event.toast.durationMs > 0) {
                    const handle = setTimeout(
                        () => remove(event.toast.id),
                        event.toast.durationMs,
                    );
                    timeouts.current.set(event.toast.id, handle);
                }
            } else if (event.type === "dismiss") {
                if (event.id) remove(event.id);
                else setToasts([]);
            }
        });
        return () => unsub();
    }, [remove]);

    useEffect(() => {
        const next: Record<string, number> = {};
        let changed = false;
        itemRefs.current.forEach((el, id) => {
            const h = el.offsetHeight;
            next[id] = h;
            if (heights[id] !== h) changed = true;
        });
        if (changed) setHeights(next);
    }, [toasts]); // eslint-disable-line react-hooks/exhaustive-deps

    const bottomRight = toasts.filter((t) => t.variant === "bottom-right");
    const items = [...bottomRight].reverse();

    const h = (id: string) => heights[id] || 48;

    const expandedOffset = (idx: number) => {
        let offset = 0;
        for (let j = 0; j < idx; j++) offset += h(items[j].id) + GAP;
        return offset;
    };

    const containerHeight =
        items.length > 0
            ? hovered
                ? expandedOffset(items.length - 1) +
                  h(items[items.length - 1].id)
                : h(items[0].id) +
                  Math.min(items.length - 1, MAX_VISIBLE_STACKED - 1) * PEEK
            : 0;

    const center = toasts.filter((t) => t.variant === "center");
    const latestCenter = center.length > 0 ? center[center.length - 1] : null;

    return (
        <>
            {items.length > 0 && (
                <div className="pointer-events-none fixed right-4 bottom-4 z-50 w-full max-w-sm">
                    <div
                        className="pointer-events-auto relative transition-[height] duration-300 ease-out"
                        style={{ height: containerHeight }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {items.map((t, i) => (
                            <div
                                key={t.id}
                                ref={(el) => {
                                    if (el) itemRefs.current.set(t.id, el);
                                    else itemRefs.current.delete(t.id);
                                }}
                                className="absolute bottom-0 left-0 w-full transition-all duration-300 ease-out"
                                style={{
                                    zIndex: items.length - i,
                                    transform: hovered
                                        ? `translateY(-${expandedOffset(i)}px)`
                                        : i === 0
                                          ? "none"
                                          : `translateY(-${i * PEEK}px) scale(${1 - i * 0.05})`,
                                    opacity:
                                        !hovered && i >= MAX_VISIBLE_STACKED
                                            ? 0
                                            : 1,
                                    transformOrigin: "bottom center",
                                }}
                            >
                                <Toast
                                    title={t.title}
                                    body={
                                        t.body !== "" && t.body != null
                                            ? t.body
                                            : undefined
                                    }
                                    status={t.status}
                                    onClose={() => remove(t.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {latestCenter && (
                <div className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
                    <div className="pointer-events-auto w-full max-w-sm">
                        <Toast
                            title={latestCenter.title}
                            body={
                                latestCenter.body !== "" &&
                                latestCenter.body != null
                                    ? latestCenter.body
                                    : undefined
                            }
                            status={latestCenter.status}
                            onClose={() => remove(latestCenter.id)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
