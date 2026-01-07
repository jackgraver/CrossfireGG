import { createFileRoute } from "@tanstack/react-router";
import UserForm from "@/shared/UserForm";
import { useState } from "react";
import RegisterStep2Team from "./-steps/step2_team";
import RegisterStep3Players from "./-steps/step3_players";
import RegisterStep4SubCoach from "./-steps/step4_subcoach";
import RegisterStep5Agreements from "./-steps/step5_agreements";
import { useForm, useStore } from "@tanstack/react-form";

export const Route = createFileRoute("/register/")({
    component: RegisterPage,
});

const formSteps = [
    "team",
    "players",
    "sub_coach",
    "agreements",
    "payment",
] as const;
type FormStep = (typeof formSteps)[number];

function RegisterPage() {
    // TODO: Replace with actual auth check
    const isLoggedIn = true;

    const form = useForm({
        defaultValues: {
            teamId: "",
            playerIds: [] as string[],
            subIds: [] as string[],
            coachId: "",
            agreements: {
                rulesAndGuidelines: false,
                discordConfirmation: false,
            },
        },
        onSubmit: async ({ value }) => {
            console.log(value);
        },
    });
    const [stepIndex, setStepIndex] = useState(0);
    const currentStep = formSteps[stepIndex];

    const teamId = useStore(form.store, (state) => state.values.teamId);
    const playerIds = useStore(form.store, (state) => state.values.playerIds);
    const subIds = useStore(form.store, (state) => state.values.subIds);
    const agreements = useStore(form.store, (state) => state.values.agreements);

    const stepValidation: Record<FormStep, boolean> = {
        team: teamId !== "",
        players: playerIds.length === 5,
        sub_coach: subIds.length <= 3,
        agreements:
            agreements.rulesAndGuidelines && agreements.discordConfirmation,
        payment: true,
    };

    const canContinue = stepValidation[currentStep];

    if (!isLoggedIn) {
        return (
            <UserForm>
                <button className="rounded bg-orange-500 p-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50">
                    Sign In With Faceit
                </button>
            </UserForm>
        );
    }

    return (
        <UserForm>
            <form></form>
            <div className="flex w-full flex-col gap-y-4">
                <div>
                    {currentStep === "team" && (
                        <form.Field
                            name="teamId"
                            children={(field) => {
                                return (
                                    <RegisterStep2Team
                                        selectedTeamId={[field.state.value]}
                                        onSelectionChange={field.handleChange}
                                    />
                                );
                            }}
                        />
                    )}
                    {currentStep === "players" && (
                        <form.Field
                            name="playerIds"
                            mode="array"
                            children={(field) => {
                                return (
                                    <RegisterStep3Players
                                        teamId={teamId}
                                        selectedPlayerIds={field.state.value}
                                        onSelectionChange={field.handleChange}
                                    />
                                );
                            }}
                        />
                    )}
                    {currentStep === "sub_coach" && (
                        <form.Field
                            name="subIds"
                            children={(field) => {
                                return (
                                    <RegisterStep4SubCoach
                                        teamId={teamId}
                                        excludedPlayerIds={playerIds}
                                        selectedSubCoachIds={field.state.value}
                                        onSelectionChange={field.handleChange}
                                    />
                                );
                            }}
                        />
                    )}
                    {currentStep === "agreements" && (
                        <form.Field
                            name="agreements"
                            children={(field) => {
                                return (
                                    <RegisterStep5Agreements
                                        rulesAndGuidelines={
                                            field.state.value.rulesAndGuidelines
                                        }
                                        discordConfirmation={
                                            field.state.value
                                                .discordConfirmation
                                        }
                                        onRulesAndGuidelinesChange={
                                            field.handleChange
                                        }
                                        onDiscordConfirmationChange={
                                            field.handleChange
                                        }
                                    />
                                );
                            }}
                        />
                    )}
                    {currentStep === "payment" && (
                        <h1>Please Complete Payment</h1>
                    )}
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                    <button
                        onClick={() => setStepIndex((i) => i - 1)}
                        className="flex-1 rounded bg-gray-600 px-6 py-2 font-semibold hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={stepIndex === 0}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setStepIndex((i) => i + 1)}
                        className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={
                            stepIndex >= formSteps.length - 1 || !canContinue
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>
        </UserForm>
    );
}
