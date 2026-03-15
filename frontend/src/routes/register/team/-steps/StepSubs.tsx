import { useTeamPlayers } from "../-queries/registerTeam.queries";
import { Loader } from "lucide-react";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import StepContainer from "../-components/StepContainer";
import PlayerFormFields from "../-components/PlayerFormFields";
import type { StepValidationErrors } from "../-types/registration.types";

type StepSubsProps = {
    form: any;
    userFaceitId?: string | null;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function StepSubs({
    form,
    userFaceitId,
    errors,
    canGoBack,
    canGoNext,
    onBack,
    onNext,
}: StepSubsProps) {
    const teamId = form.state.values.team.teamId;
    const starters = form.state.values.starters;
    const subs = form.state.values.subs;
    const coach = form.state.values.coach;

    const excludedIds = new Set([
        ...starters.map((player: any) => player.faceitId),
        ...coach.map((player: any) => player.faceitId),
    ]);

    const { data: teamPlayers, isLoading, error } = useTeamPlayers(teamId);

    const left = (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold text-white">Select Subs</h1>
                <p className="text-sm text-gray-400">
                    Choose up to 3 substitute players (optional).
                </p>
            </div>
            {error && (
                <div className="text-red-500">Error: {error.message}</div>
            )}
            {isLoading && (
                <div className="flex items-center gap-x-2 py-4 text-gray-400">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Loading team players...</span>
                </div>
            )}
            <SelectableCardGroup
                min={0}
                max={3}
                selectedElements={subs}
                onChange={(value: any) => {
                    const existingIndex = subs.findIndex(
                        (player: any) => player.faceitId === value.user_id,
                    );
                    if (existingIndex >= 0) {
                        form.setFieldValue(
                            "subs",
                            subs.filter(
                                (_: any, i: number) => i !== existingIndex,
                            ),
                        );
                    } else {
                        form.setFieldValue("subs", [
                            ...subs,
                            {
                                faceitId: value.user_id,
                                hltvLink: "",
                                discordId: "",
                                playerName: value.nickname,
                                nationality: value.nationality,
                                avatar: value.avatar,
                            },
                        ]);
                    }
                }}
            >
                {!isLoading &&
                    teamPlayers?.players
                        ?.filter(
                            (player) =>
                                !excludedIds.has(player.user_id) &&
                                !subs.some(
                                    (sub: any) =>
                                        sub.faceitId === player.user_id,
                                ),
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
                <h2 className="text-xl font-semibold text-white">
                    Subs Details
                </h2>
                <p className="text-sm text-gray-400">
                    Complete the information for each selected substitute.
                </p>
            </div>
            <div className="flex flex-col gap-y-4">
                {subs.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-700 text-gray-500">
                        Select players from the list to see their details
                        (optional)
                    </div>
                )}
                {subs.map((player: any, index: number) => (
                    <div
                        key={player.faceitId}
                        className="rounded-lg transition-all duration-200"
                    >
                        <PlayerFormFields
                            form={form}
                            namePrefix={`subs[${index}]`}
                            labelPrefix={`Sub ${index + 1}`}
                            onRemove={
                                player.faceitId !== userFaceitId
                                    ? () =>
                                          form.setFieldValue(
                                              "subs",
                                              subs.filter(
                                                  (_: any, i: number) =>
                                                      i !== index,
                                              ),
                                          )
                                    : undefined
                            }
                        />
                    </div>
                ))}
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
        />
    );
}
