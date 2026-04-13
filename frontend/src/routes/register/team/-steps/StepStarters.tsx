import { useTeamPlayers } from "../-queries/registerTeam.queries";
import { Loader } from "lucide-react";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import StepContainer from "../-components/StepContainer";
import PlayerFormFields from "../-components/PlayerFormFields";
import type { StepValidationErrors } from "../-types/registration.types";
import { useEffect } from "react";

type StepStartersProps = {
    form: any;
    userFaceitId?: string | null;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function StepStarters({
    form,
    userFaceitId,
    errors,
    canGoBack,
    canGoNext,
    onBack,
    onNext,
}: StepStartersProps) {
    const teamId = form.state.values.team.teamId;
    const starters = form.state.values.starters;
    const subs = form.state.values.subs;
    const coach = form.state.values.coach;

    const excludedIds = new Set([
        ...subs.map((player: any) => player.faceitId),
        ...coach.map((player: any) => player.faceitId),
    ]);

    const { data: teamPlayers, isLoading, error } = useTeamPlayers(teamId);

    // When the Faceit roster loads, back-fill the captain's nickname into the disabled `playerName` field.
    const captain = userFaceitId
        ? teamPlayers?.players?.find((p) => p.user_id === userFaceitId)
        : undefined;

    useEffect(() => {
        if (!captain) return;
        const currentName = form.state.values.starters?.[0]?.playerName;
        if (currentName !== captain.nickname) {
            form.setFieldValue("starters[0].playerName", captain.nickname);
            form.setFieldValue("starters[0].nationality", captain.nationality);
            form.setFieldValue("starters[0].avatar", captain.avatar);
        }
    }, [captain?.nickname, form]);

    const left = (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1">
                <h1 className="text-2xl font-bold text-white">Select Starters</h1>
                <p className="text-sm text-gray-400">
                    Choose 5 players to be in your starting lineup.
                </p>
            </div>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {isLoading && (
                <div className="flex items-center gap-x-2 py-4 text-gray-400">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Loading team players...</span>
                </div>
            )}
            <SelectableCardGroup
                min={5}
                max={5}
                selectedElements={starters}
                onChange={(value: any) => {
                    const existingIndex = starters.findIndex(
                        (player: any) => player.faceitId === value.user_id,
                    );
                    if (existingIndex >= 0) {
                        form.setFieldValue(
                            "starters",
                            starters.filter((_: any, i: number) => i !== existingIndex),
                        );
                    } else {
                        form.setFieldValue("starters", [
                            ...starters,
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
                                !starters.some(
                                    (starter: any) => starter.faceitId === player.user_id,
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
                <h2 className="text-xl font-semibold text-white">Starters Details</h2>
                <p className="text-sm text-gray-400">
                    Complete the information for each selected starter.
                </p>
            </div>
            <div className="flex flex-col gap-y-2">
                {starters.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-700 text-gray-500">
                        Select players from the list to see their details
                    </div>
                )}
                {starters.map((player: any, index: number) => (
                    <div key={player.faceitId} className="rounded-lg transition-all duration-20">
                        <PlayerFormFields
                            form={form}
                            namePrefix={`starters[${index}]`}
                            labelPrefix={`Player ${index + 1}`}
                            onRemove={
                                player.faceitId !== userFaceitId
                                    ? () =>
                                          form.setFieldValue(
                                              "starters",
                                              starters.filter((_: any, i: number) => i !== index),
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
