interface InfoBoxProps {
    title: string;
    icon: React.ReactNode;
    description?: string;
    clickAction?: () => void;
}

export default function InfoBox({
    title,
    icon,
    description,
    clickAction,
}: InfoBoxProps) {
    const isClickable = typeof clickAction === "function";

    return isClickable ? (
        <button
            type="button"
            onClick={clickAction}
            className="border-cfRedDark/80 hover:border-cfRedDark/60 flex w-96 cursor-pointer flex-col rounded-md border-2 bg-zinc-900 p-4 text-left shadow-md transition hover:bg-zinc-800"
        >
            <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {description ? (
                <p className="pt-2 text-zinc-300">{description}</p>
            ) : null}
        </button>
    ) : (
        <article className="border-cfRedDark/80 flex w-96 flex-col rounded-md border-2 bg-zinc-900 p-4 text-left shadow-md">
            <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            {description ? (
                <p className="pt-2 text-zinc-300">{description}</p>
            ) : null}
        </article>
    );
}
