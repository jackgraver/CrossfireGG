export default function UpcomingMatchRefreshIndicator() {
    return (
        <div className="flex shrink-0 items-center gap-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-orange-400 uppercase">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
            </span>
            Syncing
        </div>
    );
}
