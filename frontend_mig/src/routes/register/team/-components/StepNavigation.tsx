type StepNavigationProps = {
    canGoBack: boolean;
    canGoNext: boolean;
    isSubmitting?: boolean;
    isFinishStep?: boolean;
    onBack: () => void;
    onNext: () => void;
    onFinish?: () => void;
};

    canGoBack,
    canGoNext,
    isSubmitting = false,
    isFinishStep = false,
    onBack,
    onNext,
    onFinish,
}: StepNavigationProps) {
    const handlePrimary = isFinishStep && onFinish ? onFinish : onNext;
    const primaryLabel = isFinishStep ? "Finish" : "Continue";

    return (
        <div className="flex w-full items-center justify-between gap-4">
            <button
                onClick={onBack}
                className="flex-1 rounded bg-firstBg px-6 py-2 font-semibold hover:bg-secondBg disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canGoBack}
                type="button"
            >
                Back
            </button>
            <button
                onClick={handlePrimary}
                className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canGoNext || isSubmitting}
                type="button"
            >
                {isSubmitting ? "Submitting..." : primaryLabel}
            </button>
        </div>
    );
}
