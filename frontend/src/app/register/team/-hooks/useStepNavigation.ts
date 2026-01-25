import { useMemo, useState } from "react";
import { FormStep, formSteps } from "../-types/registration.types";

type UseStepNavigationOptions = {
    steps?: readonly FormStep[];
    validateStep?: (step: FormStep) => boolean;
};

export function useStepNavigation(options: UseStepNavigationOptions = {}) {
    const steps: readonly FormStep[] = options.steps ?? formSteps;
    const [stepIndex, setStepIndex] = useState(4);
    const currentStep = steps[stepIndex];

    const canGoBack = stepIndex > 0;
    const canGoNext = useMemo(() => {
        if (!options.validateStep) return true;
        return options.validateStep(currentStep);
    }, [currentStep, options]);

    const goNext = () => {
        if (!canGoNext) return;
        setStepIndex((index) => Math.min(index + 1, steps.length - 1));
    };

    const goBack = () => {
        if (!canGoBack) return;
        setStepIndex((index) => Math.max(index - 1, 0));
    };

    const goTo = (step: FormStep) => {
        const index = steps.indexOf(step);
        if (index >= 0) {
            setStepIndex(index);
        }
    };

    return {
        steps,
        stepIndex,
        currentStep,
        canGoBack,
        canGoNext,
        goNext,
        goBack,
        goTo,
        setStepIndex,
    };
}
