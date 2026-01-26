import { useCallback } from "react";
import {
    coachStepSchema,
    startersStepSchema,
    subsStepSchema,
    teamStepSchema,
} from "../-schemas/registration.schemas";
import {
    FormStep,
    RegistrationFormData,
    StepValidationResult,
    StepValidationErrors,
} from "../-types/registration.types";

const schemaByStep: Record<FormStep, any> = {
    team: teamStepSchema,
    starters: startersStepSchema,
    subs: subsStepSchema,
    coach: coachStepSchema,
    review: null,
    finished: null,
};

const buildErrors = (issues: { path: (string | number)[]; message: string }[]) =>
    issues.reduce<StepValidationErrors>((acc, issue) => {
        const key = issue.path.join(".");
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(issue.message);
        return acc;
    }, {});

export function useStepValidation(values: RegistrationFormData) {
    const canContinue = useCallback(
        (step: FormStep) => {
            console.log("starters", values.starters);
            if (step === "team") return Boolean(values.team.teamId);
            if (step === "starters") return values.starters.length === 5;
            if (step === "subs") return values.subs.length >= 0 && values.subs.length <= 3;
            if (step === "coach") return true;
            if (step === "review") return true;
            return false;
        },
        [values],
    );

    const validateStep = useCallback(
        (step: FormStep): StepValidationResult => {
            const schema = schemaByStep[step];
            if (!schema) {
                return { isValid: true, errors: {} };
            }
            const result = schema.safeParse(values);
            if (result.success) {
                return { isValid: true, errors: {} };
            }
            return {
                isValid: false,
                errors: buildErrors(result.error.issues),
            };
        },
        [values],
    );

    return { canContinue, validateStep };
}
