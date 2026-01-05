import { createFileRoute } from "@tanstack/react-router";
import UserForm from "@/shared/UserForm";
import { useState, useEffect, useRef } from "react";
import RegisterStep2Team from "./steps/step2_team";
import RegisterStep3Players from "./steps/step3_players";
import RegisterStep4SubCoach from "./steps/step4_subcoach";

export const Route = createFileRoute("/register/")({
    component: RegisterPage,
});

const formSteps = ["team", "players", "sub_coach", "agreements"] as const;
type FormStep = (typeof formSteps)[number];

function RegisterPage() {
    // TODO: Replace with actual auth check
    const isLoggedIn = true;

    const [stepIndex, setStepIndex] = useState(0);
    const currentStep = formSteps[stepIndex];

    const [selectedTeamId, setSelectedTeamId] = useState<string[]>([]);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
    const [selectedSubCoachIds, setSelectedSubCoachIds] = useState<string[]>(
        [],
    );

    const prevTeamIdRef = useRef<string[]>([]);
    const prevPlayerIdsRef = useRef<string[]>([]);

    useEffect(() => {
        const teamChanged = prevTeamIdRef.current[0] !== selectedTeamId[0];
        if (teamChanged && prevTeamIdRef.current.length > 0) {
            setSelectedPlayerIds([]);
            setSelectedSubCoachIds([]);
        }
        prevTeamIdRef.current = selectedTeamId;
    }, [selectedTeamId]);

    useEffect(() => {
        const playersChanged =
            JSON.stringify(prevPlayerIdsRef.current.sort()) !==
            JSON.stringify(selectedPlayerIds.sort());
        if (playersChanged && prevPlayerIdsRef.current.length > 0) {
            setSelectedSubCoachIds((prev) =>
                prev.filter((id) => !selectedPlayerIds.includes(id)),
            );
        }
        prevPlayerIdsRef.current = selectedPlayerIds;
    }, [selectedPlayerIds]);

    const stepValidation: Record<FormStep, boolean> = {
        team: selectedTeamId.length === 1,
        players: selectedPlayerIds.length === 5,
        sub_coach: selectedSubCoachIds.length <= 3,
        agreements: true,
    };

    const canContinue = stepValidation[currentStep];
    const canGoBack = stepIndex > 0;
    const canGoForward = stepIndex < formSteps.length - 1 && canContinue;

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
                        <RegisterStep2Team
                            selectedTeamId={selectedTeamId}
                            onSelectionChange={setSelectedTeamId}
                        />
                    )}
                    {currentStep === "players" && (
                        <RegisterStep3Players
                            teamId={selectedTeamId[0] ?? ""}
                            selectedPlayerIds={selectedPlayerIds}
                            onSelectionChange={setSelectedPlayerIds}
                        />
                    )}
                    {currentStep === "sub_coach" && (
                        <RegisterStep4SubCoach
                            teamId={selectedTeamId[0] ?? ""}
                            excludedPlayerIds={selectedPlayerIds}
                            selectedSubCoachIds={selectedSubCoachIds}
                            onSelectionChange={setSelectedSubCoachIds}
                        />
                    )}
                    {currentStep === "agreements" && <div>Agreements step</div>}
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                    <button
                        onClick={() => setStepIndex((i) => i - 1)}
                        className="flex-1 rounded bg-gray-600 px-6 py-2 font-semibold hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!canGoBack}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setStepIndex((i) => i + 1)}
                        className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!canGoForward}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </UserForm>
    );
}
