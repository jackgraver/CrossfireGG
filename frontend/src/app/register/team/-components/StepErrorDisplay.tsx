type StepErrorDisplayProps = {
    errors: Partial<Record<string, string[]>>;
};

export default function StepErrorDisplay({ errors }: StepErrorDisplayProps) {
    const entries = Object.entries(errors);
    if (entries.length === 0) return null;

    return (
        <div className="rounded border border-red-500 bg-red-50 p-3 text-sm text-red-700">
            {entries.map(([key, messages]) => (
                <div key={key}>
                    {(messages ?? []).map((message, index) => (
                        <div key={`${key}-${index}`}>{message}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}
