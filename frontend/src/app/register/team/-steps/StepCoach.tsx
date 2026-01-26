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
                <p className="text-sm text-gray-400">Choose a coach for your team.</p>
            </div>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {isLoading && (
                <div className="flex items-center gap-x-2 text-gray-400 py-4">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Loading team players...</span>
                </div>
            )}
            <SelectableCardGroup
                min={1}
                max={1}
                selectedElements={coach.faceitId ? [coach] : []}
                onChange={(value: any) => {
                    if (coach.faceitId === value.user_id) {
                        return;
                    }
                    form.setFieldValue("coach", {
                        faceitId: value.user_id,
                        hltvLink: "",
                        discordId: "",
                        playerName: value.nickname,
                        nationality: value.nationality,
                        avatar: value.avatar,
                    });
                }}
            >
                {!isLoading &&
                    teamPlayers?.players
                        ?.filter((player) => !excludedIds.has(player.user_id))
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
            <div className="rounded-lg transition-all duration-200">
                <PlayerFormFields form={form} namePrefix="coach" labelPrefix="Coach" />
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
