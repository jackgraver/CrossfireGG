import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FaceitSyncStatusBadgeProps = {
    syncStatus: string | undefined;
};

type Phase = "hidden" | "pending" | "success";

export function FaceitSyncStatusBadge({
    syncStatus,
}: FaceitSyncStatusBadgeProps) {
    const [phase, setPhase] = useState<Phase>("hidden");
    const prevRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        const status = syncStatus ?? "idle";
        const prev = prevRef.current;
        prevRef.current = status;

        if (status === "processing") {
            setPhase("pending");
            return;
        }
        if (prev === "processing" && status === "idle") {
            setPhase("success");
            const t = setTimeout(() => setPhase("hidden"), 3000);
            return () => clearTimeout(t);
        }
    }, [syncStatus]);

    if (phase === "hidden") return null;

    if (phase === "pending") {
        return (
            <div className="flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-black tracking-wide text-orange-400 uppercase">
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
                </span>
                Pending Faceit update
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-xs font-black tracking-wide text-green-400 uppercase">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-400" />
            Faceit updated
        </div>
    );
}
