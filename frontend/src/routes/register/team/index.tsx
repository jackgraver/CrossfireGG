import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import z from "zod";
import UserForm from "@/components/shared/UserForm";
import { useAuth } from "@/contexts/auth";
import { formSteps, type StepValidationErrors } from "./-types/registration.types";
import { useTeamRegistrationForm } from "./-hooks/useTeamRegistrationForm";
import { useStepNavigation } from "./-hooks/useStepNavigation";
import { useStepValidation } from "./-hooks/useStepValidation";
import StepTeamSelection from "./-steps/StepTeamSelection";
import StepStarters from "./-steps/StepStarters";
import StepSubs from "./-steps/StepSubs";
import StepCoach from "./-steps/StepCoach";
import StepAgreements from "./-steps/StepAgreements";
import StepReview from "./-steps/StepReview";
import StepFinished from "./-steps/StepFinished";

export const Route = createFileRoute("/register/team/")({
    component: RegisterPage,
    validateSearch: z.object({
        tournamentId: z.string().optional(),
    }),
});

function RegisterPage() {
    const navigate = useNavigate();
    const { tournamentId } = Route.useSearch();
    const { user, isLoading } = useAuth();
    const [registeredTeamId, setRegisteredTeamId] = useState<number>(0);
    const [stepErrors, setStepErrors] = useState<StepValidationErrors>({});

    const { form, registerMutation } = useTeamRegistrationForm({
        userFaceitId: user?.faceitId,
        tournamentId: tournamentId ?? null,
        onSuccess: (res) => {
            setRegisteredTeamId(res.team_id);
            setStepIndex(formSteps.length - 1);
        },
    });

    const values = useStore(form.store, (state) => state.values);
    const { canContinue, validateStep } = useStepValidation(values);
    const { currentStep, canGoBack, canGoNext, goBack, goNext, setStepIndex } = useStepNavigation({
        steps: formSteps,
        validateStep: (step) => canContinue(step),
    });

    const isLoggedIn = !!user;

    if (isLoading) {
        return null;
    }

    if (!isLoggedIn && !isLoading) {
        return (
            <UserForm>
                <button className="rounded bg-orange-500 p-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50">
                    Sign In With Faceit
                </button>
            </UserForm>
        );
    }

    const handleBack = () => {
        setStepErrors({});
        goBack();
    };

    const handleNext = () => {
        const result = validateStep(currentStep);
        if (!result.isValid) {
            setStepErrors(result.errors);
            return;
        }
        setStepErrors({});
        goNext();
    };

    const handleFinish = () => {
        const result = validateStep(currentStep);
        if (!result.isValid) {
            setStepErrors(result.errors);
            return;
        }
        setStepErrors({});
        form.handleSubmit();
    };

    if (currentStep === "team") {
        return (
            <StepTeamSelection
                form={form}
                userFaceitId={user?.faceitId}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                onBack={handleBack}
                onNext={handleNext}
            />
        );
    }

    if (currentStep === "starters") {
        return (
            <StepStarters
                form={form}
                userFaceitId={user?.faceitId}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                onBack={handleBack}
                onNext={handleNext}
            />
        );
    }

    if (currentStep === "subs") {
        return (
            <StepSubs
                form={form}
                userFaceitId={user?.faceitId}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                onBack={handleBack}
                onNext={handleNext}
            />
        );
    }

    if (currentStep === "coach") {
        return (
            <StepCoach
                form={form}
                userFaceitId={user?.faceitId}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                onBack={handleBack}
                onNext={handleNext}
            />
        );
    }

    if (currentStep === "agreements") {
        return (
            <StepAgreements
                form={form}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                onBack={handleBack}
                onNext={handleNext}
            />
        );
    }

    if (currentStep === "review") {
        return (
            <StepReview
                form={form}
                errors={stepErrors}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                isSubmitting={registerMutation.isPending}
                onBack={handleBack}
                onNext={handleNext}
                onFinish={handleFinish}
            />
        );
    }

    return (
        <StepFinished
            tournamentId={tournamentId}
            onJoinTournament={() => {
                if (!tournamentId) return;
                navigate({
                    to: "/",
                    // to: "/register/tournament/$tournamentId",
                    // params: { tournamentId },
                });
            }}
            onBrowseTournaments={() =>
                navigate({
                    to: "/tournament",
                })
            }
            onViewTeam={() =>
                navigate({
                    to: `/team/$team_id`,
                    params: { team_id: registeredTeamId.toString() },
                })
            }
        />
    );
}
