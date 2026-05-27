import { useTeamPlayers } from "../-queries/registerTeam.queries";
import { Loader } from "lucide-react";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import StepContainer from "../-components/StepContainer";
import PlayerFormFields from "../-components/PlayerFormFields";
import type { StepValidationErrors } from "../-types/registration.types";

type StepCoachProps = {
    form: any;
    userFaceitId?: string | null;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function StepCoach({
    form,
    userFaceitId,
    errors,
    canGoBack,
    canGoNext,
    onBack,
    onNext,
}: StepCoachProps) {
    const teamId = form.state.values.team.teamId;
    const starters = form.state.values.starters;
    const subs = form.state.values.subs;
    const coach = form.state.values.coach;

    const excludedIds = new Set([
        ...starters.map((player: any) => player.faceitId),
        ...subs.map((player: any) => player.faceitId),
    ]);

    const { data: teamPlayers, isLoading, error } = useTeamPlayers(teamId);

    const left = (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold text-white">Select Coach</h1>
                <p className="text-sm text-gray-400">Choose a coach for your team (optional).</p>
            </div>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {isLoading && (
                <div className="flex items-center gap-x-2 text-gray-400 py-4">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Loading team players...</span>
                </div>
            )}
            <SelectableCardGroup
                min={0}
                max={1}
                selectedElements={coach}
                onChange={(value: any) => {
                    const existingIndex = coach.findIndex(
                        (player: any) => player.faceitId === value.user_id,
                    );
                    if (existingIndex >= 0) {
                        form.setFieldValue(
                            "coach",
                            coach.filter((_: any, i: number) => i !== existingIndex),
                        );
                    } else {
                        const nextCoach = [
                            {
                                faceitId: value.user_id,
                                hltvLink: "",
                                discordId: "",
                                playerName: value.nickname,
                                nationality: value.nationality,
                                avatar: value.avatar,
                            },
                        ];
                        form.setFieldValue(
                            "coach",
                            coach.length >= 1 ? nextCoach : [...coach, ...nextCoach],
                        );
                    }
                }}
            >
                {!isLoading &&
                    teamPlayers?.players
                        ?.filter(
                            (player) =>
                                !excludedIds.has(player.user_id) &&
                                !coach.some((c: any) => c.faceitId === player.user_id),
                        )
                        .map((player) => (
                            <SelectableCard
                                key={player.user_id}
                                element={player}
                                avatar={player.avatar}
                                name={player.nickname}
                                disabled={player.user_id === userFaceitId}
                            />
                        ))}
            </SelectableCardGroup>
        </div>
    );

    const right = (
        <div className="flex flex-col gap-y-6">
            <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold text-white">Coach Details</h2>
                <p className="text-sm text-gray-400">
                    Complete the information for your team coach.
                </p>
            </div>
            {coach.length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-700 text-gray-500">
                    Select a coach from the list to see their details (optional)
                </div>
            )}
            {coach.map((player: any, index: number) => (
                <div key={player.faceitId} className="rounded-lg transition-all duration-200">
                    <PlayerFormFields
                        form={form}
                        namePrefix={`coach[${index}]`}
                        labelPrefix="Coach"
                        onRemove={() =>
                            form.setFieldValue(
                                "coach",
                                coach.filter((_: any, i: number) => i !== index),
                            )
                        }
                    />
                </div>
            ))}
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
        />
    );
}
