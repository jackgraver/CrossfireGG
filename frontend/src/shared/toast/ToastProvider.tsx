import React, { useEffect, useMemo, useRef, useState } from "react";
import Toast, { BottomRightToast, CenterToast } from "./Toast";
import { toastService, ToastInstance } from "./toastService";

/**
 * Mounted once at the app root. Listens to `toastService` events and renders
 * the appropriate toasts.
 *
 * - Bottom-right: stacked list
 * - Center: only the most recent is shown
 */
export default function ToastProvider() {
    const [toasts, setToasts] = useState<ToastInstance[]>([]);
    const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

    /** Remove a toast by id and clear its auto-dismiss timeout if present. */
    const remove = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const t = timeouts.current.get(id);
        if (t) {
            clearTimeout(t);
            timeouts.current.delete(id);
        }
    };

    useEffect(() => {
        const unsub = toastService.subscribe((event) => {
            if (event.type === "show") {
                setToasts((prev) => [...prev, event.toast]);
                if (event.toast.durationMs && event.toast.durationMs > 0) {
                    const handle = setTimeout(() => remove(event.toast.id), event.toast.durationMs);
                    timeouts.current.set(event.toast.id, handle);
                }
            } else if (event.type === "dismiss") {
                if (event.id) remove(event.id);
                else setToasts([]);
            }
        });
        return () => unsub();
    }, []);

    /** All bottom-right positioned toasts (stacked). */
    const bottomRightToasts = useMemo(
        () => toasts.filter((t) => t.variant === "bottom-right"),
        [toasts],
    );
    /** Centered toasts (only most recent is rendered). */
    const centerToasts = useMemo(() => toasts.filter((t) => t.variant === "center"), [toasts]);

    return (
        <>
            {/* Bottom-right stack */}
            <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2">
                {bottomRightToasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto">
                        <BottomRightToast
                            title={t.title}
                            body={t.body}
                            status={t.status}
                            onClose={() => remove(t.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Centered single toast (last one wins) */}
            {centerToasts.length > 0 && (
                <CenterToast
                    title={centerToasts[centerToasts.length - 1].title}
                    body={centerToasts[centerToasts.length - 1].body}
                    status={centerToasts[centerToasts.length - 1].status}
                    onClose={() => remove(centerToasts[centerToasts.length - 1].id)}
                />
            )}
        </>
    );
}
