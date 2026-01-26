import { ReactNode } from "react";
import StepNavigation from "./StepNavigation";
import type { StepValidationErrors } from "../-types/registration.types";

type StepContainerProps = {
    left: ReactNode;
    right: ReactNode;
    errors?: StepValidationErrors;
    // Navigation props
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
    onFinish?: () => void;
    isFinishStep?: boolean;
    isSubmitting?: boolean;
};

export default function StepContainer({
    left,
    right,
    errors = {},
    canGoBack,
    canGoNext,
    onBack,
    onNext,
    onFinish,
    isFinishStep,
    isSubmitting,
}: StepContainerProps) {
    return (
        <div className="flex min-h-screen w-full flex-col px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1400px]">
                <div className="mb-8 rounded-lg shadow-lg backdrop-blur-md">
                    <StepNavigation
                        canGoBack={canGoBack}
                        canGoNext={canGoNext}
                        onBack={onBack}
                        onNext={onNext}
                        onFinish={onFinish}
                        isFinishStep={isFinishStep}
                        isSubmitting={isSubmitting}
                    />
                </div>
                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex w-full flex-col lg:sticky lg:top-[120px] lg:w-1/3">
                        <div className="flex h-full flex-col gap-y-4 rounded-lg bg-firstBg p-6 shadow-lg border border-gray-700/50">
                            <div className="flex-1 overflow-y-auto pr-2">{left}</div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col lg:w-2/3">
                        <div className="flex flex-col gap-y-6 rounded-lg bg-firstBg p-6 shadow-lg border border-gray-700/50">
                            {right}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
