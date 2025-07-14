type OSSFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    onCancel?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
};

export default function OSSForm({
    onSubmit,
    children,
    onCancel,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
}: OSSFormProps) {
    return (
        <form onSubmit={onSubmit} className="w-full">
            {children}
            <div className="mt-6 flex flex-row gap-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded bg-border px-4 py-2 text-textSecondary hover:bg-secondBg"
                    >
                        {cancelLabel}
                    </button>
                )}
                <button
                    type="submit"
                    className={`rounded bg-blue-500 px-4 py-2 text-textPrimary hover:bg-blue-600 focus:bg-blue-600 ${
                        onCancel ? "flex-1" : "w-full"
                    }`}
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
