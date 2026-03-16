interface InfoBoxProps {
    title: string;
    description?: string;
    clickAction?: () => void;
}

export default function InfoBox({
    title,
    description,
    clickAction,
}: InfoBoxProps) {
    const isClickable = typeof clickAction === "function";

    return isClickable ? (
        <button
            type="button"
            onClick={clickAction}
            className="flex w-96 cursor-pointer flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-left shadow-md transition hover:bg-zinc-800"
        >
            <h2 className="text-2xl font-bold">{title}</h2>
            {description ? (
                <p className="pt-2 text-zinc-300">{description}</p>
            ) : null}
        </button>
    ) : (
        <article className="flex w-96 flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-left shadow-md">
            <h2 className="text-2xl font-bold">{title}</h2>
            {description ? (
                <p className="pt-2 text-zinc-300">{description}</p>
            ) : null}
        </article>
    );
}
