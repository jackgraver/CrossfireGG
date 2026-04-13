interface InfoBoxProps {
    title: string;
    icon: React.ReactNode;
    description?: string;
    clickAction?: () => void;
}

export default function InfoBox({ title, icon, description, clickAction }: InfoBoxProps) {
    const isClickable = typeof clickAction === "function";

    return isClickable ? (
        <button
            type="button"
            onClick={clickAction}
            className="border-secondBg hover:bg-secondBg/60 bg-firstBg flex w-full cursor-pointer flex-col rounded-md border-2 p-4 text-left shadow-md backdrop-blur-sm transition hover:bg-zinc-800/80"
        >
            <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {description ? <p className="pt-2 text-zinc-300">{description}</p> : null}
        </button>
    ) : (
        <article className="border-secondBg bg-firstBg flex w-full flex-col rounded-md border-2 p-4 text-left shadow-md backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {description ? <p className="pt-2 text-zinc-300">{description}</p> : null}
        </article>
    );
}
