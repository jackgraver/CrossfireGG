import ReviewTeam from "../-components/ReviewTeam";
import StepContainer from "../-components/StepContainer";
import type { StepValidationErrors } from "../-types/registration.types";

type StepReviewProps = {
    form: any;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    isSubmitting?: boolean;
    onBack: () => void;
    onNext: () => void;
    onFinish: () => void;
};

export default function StepReview({
    form,
    errors,
    canGoBack,
    canGoNext,
    isSubmitting = false,
    onBack,
    onNext,
    onFinish,
}: StepReviewProps) {
    const left = (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold text-white">Review Registration</h1>
                <p className="text-sm text-gray-400">
                    Please review your team registration details before submitting.
                </p>
                <button
                    className="rounded-md bg-green-600 px-4 py-2 text-sm text-white"
                    onClick={onFinish}
                >
                    Finish Registration
                </button>
            </div>
        </div>
    );

    const right = (
        <div className="flex flex-col gap-y-6">
            <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-white">Registration Summary</h2>
                <p className="text-sm text-gray-400">Verify that all information is correct.</p>
            </div>
            <div className="rounded-lg">
                <ReviewTeam
                    teamId={form.state.values.team.teamId}
                    players={form.state.values.starters}
                    subs={form.state.values.subs}
                    coach={form.state.values.coach}
                />
            </div>
        </div>
    );

    return (
        <StepContainer
            left={left}
            right={right}
            errors={errors}
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            onBack={onBack}
            onNext={onNext}
            onFinish={onFinish}
            isFinishStep
            isSubmitting={isSubmitting}
        />
    );
}
