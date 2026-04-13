interface InfoBoxProps {
    text: string;
    subtext: string;
}

export default function InfoBox({ text, subtext }: InfoBoxProps) {
    const isMoney = text.includes("$");

    if (isMoney) {
        text = text.replace("$", "");
    }

    return (
        <article className="flex flex-col items-left">
            <span className="text-2xl font-bold">
                {isMoney ? <span className="text-orange-500">$</span> : null}
                {text}
            </span>
            <p className="text-xs text-textSecondary/60">{subtext}</p>
        </article>
    );
}
