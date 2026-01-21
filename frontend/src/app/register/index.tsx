import { createFileRoute } from "@tanstack/react-router";
import UserForm from "@/shared/UserForm";
import { useState, useEffect, useRef } from "react";
import RegisterStep2Team from "./-steps/step2_team";
import RegisterStep3Players from "./-steps/step3_players";
import RegisterStep4SubCoach from "./-steps/step4_subcoach";
import RegisterStep5Agreements from "./-steps/step5_agreements";
import { useForm, useStore } from "@tanstack/react-form";
import { openInNewTab } from "@/lib/NewTab";
import { useNavigate } from "@tanstack/react-router";
import { useRegisterTeam } from "./-queries/registerQueries";
// import { useRegisterForTournament } from "./-queries/registerQueries";

export const Route = createFileRoute("/register/")({
    component: RegisterPage,
});

const formSteps = [
    "team",
    "players",
    "subs",
    "coach",
    "agreements",
    "payment",
] as const;
type FormStep = (typeof formSteps)[number];

function RegisterPage() {
    const navigate = useNavigate();
    const registerMutation = useRegisterTeam();

    // TODO: Replace with actual auth check
    const isLoggedIn = true;

    const form = useForm({
        defaultValues: {
            teamId: "" as string,
            playerIds: ["2abbf5d5-ae35-40a1-bf6c-cf19c844168d"] as string[],
            subIds: [] as string[],
            coachId: "" as string,
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
    const coachId = useStore(form.store, (state) => state.values.coachId);
    const agreements = useStore(form.store, (state) => state.values.agreements);

    const previousTeamIdRef = useRef(teamId);

    useEffect(() => {
        if (previousTeamIdRef.current && previousTeamIdRef.current !== teamId) {
            form.setFieldValue("playerIds", []);
            form.setFieldValue("subIds", []);
            form.setFieldValue("coachId", "");
        }
        previousTeamIdRef.current = teamId;
    }, [teamId, form]);

    const stepValidation: Record<FormStep, boolean> = {
        team: teamId !== "" && teamId !== undefined,
        players: true,
        subs: subIds.length <= 3,
        coach: true, // Coach is optional
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
                    {/* {currentStep === "subs" && (
                        <form.Field
                            name="subIds"
                            children={(field) => (
                                <RegisterStep4SubCoach
                                    mode="subs"
                                    teamId={teamId}
                                    excludedPlayerIds={playerIds}
                                    selectedIds={field.state.value}
                                    onSelectionChange={field.handleChange}
                                />
                            )}
                        />
                    )}
                    {currentStep === "coach" && (
                        <form.Field
                            name="coachId"
                            children={(field) => (
                                <RegisterStep4SubCoach
                                    mode="coach"
                                    teamId={teamId}
                                    excludedPlayerIds={[
                                        ...playerIds,
                                        ...subIds,
                                    ]}
                                    selectedId={field.state.value}
                                    onSelectionChange={field.handleChange}
                                />
                            )}
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
                                        onRulesAndGuidelinesChange={(
                                            checked: boolean,
                                        ) =>
                                            field.handleChange({
                                                ...field.state.value,
                                                rulesAndGuidelines: checked,
                                            })
                                        }
                                        onDiscordConfirmationChange={(
                                            checked: boolean,
                                        ) =>
                                            field.handleChange({
                                                ...field.state.value,
                                                discordConfirmation: checked,
                                            })
                                        }
                                    />
                                );
                            }}
                        />
                    )} */}
                    {currentStep === "payment" && (
                        <div className="flex flex-col items-center gap-6 py-8">
                            <h1 className="mb-4 text-2xl font-bold">
                                You have been registered successfully!
                            </h1>
                            <button
                                className="w-full max-w-xs rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-600"
                                onClick={() =>
                                    openInNewTab(
                                        "https://www.paypal.com/paypalme/OSSCSL/75?currencyCode=USD",
                                    )
                                }
                            >
                                Pay Registration Fee
                            </button>
                            <button
                                className="w-full max-w-xs rounded bg-orange-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-orange-600"
                                onClick={() =>
                                    openInNewTab(
                                        `https://www.faceit.com/en/championship${"TODO"}`,
                                    )
                                }
                            >
                                Join Faceit Tournament
                            </button>
                            <button
                                className="w-full max-w-xs rounded bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-red-800"
                                onClick={() =>
                                    navigate({
                                        to: `/team/$team_id`,
                                        params: { team_id: teamId },
                                    })
                                }
                            >
                                View Team Page
                            </button>
                        </div>
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
                    {currentStep === "players" ? (
                        <button
                            onClick={() => {
                                registerMutation.mutate({
                                    teamId,
                                    playerIds,
                                },
                                    {
                                        onSuccess: (res) => {
                                            console.log(res);
                                            setStepIndex((i) => i + 1);
                                        },
                                        onError: (error) => {
                                            console.error(
                                                "Registration failed:",
                                                error.message,
                                            );
                                            setStepIndex((i) => i + 1);
                                        },
                                    },
                                );
                            }}
                            className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={
                                !canContinue || registerMutation.isPending
                            }
                        >
                            {registerMutation.isPending
                                ? "Submitting..."
                                : "Finish"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setStepIndex((i) => i + 1)}
                            className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={
                                stepIndex >= formSteps.length - 1 ||
                                !canContinue
                            }
                        >
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </UserForm>
    );
}
