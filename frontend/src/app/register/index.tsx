import { createFileRoute } from "@tanstack/react-router";
import UserForm from "@/shared/UserForm";
import { useState, useEffect, useRef } from "react";
import RegisterStep2Team from "./-steps/step2_team";
import RegisterStep3Players from "./-steps/step3_players";
import { useForm, useStore } from "@tanstack/react-form";
import { openInNewTab } from "@/lib/NewTab";
import { useNavigate } from "@tanstack/react-router";
import { useRegisterTeam } from "./-queries/registerQueries";
import z from "zod";
import { useSession } from "@tanstack/react-start/server";
import { authClient } from "@/lib/auth-client";
import { useAuthBundle } from "@/lib/auth.util";
import { useAuth } from "@/contexts/auth";

const formSteps = [
    "team",
    "players",
    "finished",
] as const;
type FormStep = (typeof formSteps)[number];

export const Route = createFileRoute("/register/")({
    component: RegisterPage,
    validateSearch: z.object({
        tournamentId: z.string().optional(),
    }),
});

function RegisterPage() {
    const navigate = useNavigate();
    const registerMutation = useRegisterTeam();
    const { tournamentId } = Route.useSearch();

    const { session, user, isLoading } = useAuth();

    const [registeredTeamId, setRegisteredTeamId] = useState<number>(0);

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
            registerMutation.mutate({
                teamId,
                playerIds,
            },
                {
                    onSuccess: (res) => {
                        setRegisteredTeamId(res.team_id);
                        setStepIndex(formSteps.length - 1);
                    },
                    onError: (error) => {
                        // TODO: Handle error
                        // setStepIndex((i) => i + 1);
                    },
                },
            );
        },
    });
    const [stepIndex, setStepIndex] = useState(2);
    const currentStep = formSteps[stepIndex];

    const teamId = useStore(form.store, (state) => state.values.teamId);
    const playerIds = useStore(form.store, (state) => state.values.playerIds);

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
        players: playerIds.length > 0,
        finished: false,
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
                    {currentStep === "finished" && (
                        <div className="flex flex-col items-center gap-6 py-8">
                            <h1 className="mb-4 text-2xl font-bold">
                                You have been registered successfully!
                            </h1>
                            {tournamentId ? (
                                <button
                                    className="w-full max-w-xs rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-600"
                                    onClick={() => { }
                                    }
                                >
                                    Join {"TOURNAMENT_NAME"}
                                </button>
                            ) : (
                                <button
                                    className="w-full max-w-xs rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-600"
                                    onClick={() => {
                                        navigate({
                                            to: "/tournament",
                                        });
                                    }}
                                >
                                    Browse Tournaments
                                </button>
                            )}
                            <button
                                className="w-full max-w-xs rounded bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-red-800"
                                onClick={() =>
                                    navigate({
                                        to: `/team/$team_id`,
                                        params: { team_id: registeredTeamId.toString() },
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
                            type="submit"
                            onClick={() => form.handleSubmit()}
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
