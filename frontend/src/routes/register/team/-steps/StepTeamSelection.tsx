import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { usePlayerFaceitTeams } from "../-queries/registerTeam.queries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import StepContainer from "../-components/StepContainer";
import TeamFormFields from "../-components/TeamFormFields";
import type { StepValidationErrors } from "../-types/registration.types";

type StepTeamSelectionProps = {
    form: any;
    userFaceitId?: string | null;
    errors?: StepValidationErrors;
    canGoBack: boolean;
    canGoNext: boolean;
    onBack: () => void;
    onNext: () => void;
};

export default function StepTeamSelection({
    form,
    userFaceitId,
    errors,
    canGoBack,
    canGoNext,
    onBack,
    onNext,
}: StepTeamSelectionProps) {
    const navigate = useNavigate();
    const { data: playerFaceitTeams, isLoading, error } = usePlayerFaceitTeams(userFaceitId ?? "");

    const selectedTeam = form.state.values.team;

    const left = (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold">Select Your Team</h1>
            <p className="text-gray-400">
                Choose the team you want to register from your Faceit teams.
            </p>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {isLoading && (
                <div className="flex items-center gap-x-2 py-4 text-gray-400">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Loading your teams...</span>
                </div>
            )}
            {playerFaceitTeams?.teams?.length === 0 && !isLoading && (
                <div className="text-gray-500 italic">No Faceit teams found</div>
            )}
            <SelectableCardGroup
                min={1}
                max={1}
                selectedElements={selectedTeam.teamId ? [selectedTeam] : []}
                onChange={(value: any) => {
                    if (value.team_id === selectedTeam.teamId) {
                        return;
                    }
                    form.setFieldValue("team", {
                        teamId: value.team_id,
                        name: value.name,
                        twitter: value.twitter ?? "",
                        captainFaceitId: value.leader ?? userFaceitId ?? "",
                        logo: value.avatar ?? "",
                    });
                    form.setFieldValue(
                        "starters",
                        userFaceitId
                            ? [
                                  {
                                      faceitId: userFaceitId,
                                      hltvLink: "",
                                      discordId: "",
                                      playerName: "",
                                      nationality: "",
                                      avatar: "",
                                  },
                              ]
                            : [],
                    );
                    form.setFieldValue("subs", []);
                    form.setFieldValue("coach", []);
                }}
            >
                {!isLoading &&
                    playerFaceitTeams?.teams
                        ?.sort((a: any, b: any) => (a.isRegistered ?? 0) - (b.isRegistered ?? 0))
                        .map((team) => (
                            <SelectableCard
                                key={team.team_id}
                                element={team}
                                avatar={team.avatar}
                                name={team.name}
                                disabled={team.isRegistered !== null}
                                disabledAction={{
                                    label: "Team Already Registered",
                                    onClick: () => {
                                        navigate({
                                            to: `/team/$team_id`,
                                            params: {
                                                team_id: team.isRegistered!!,
                                            },
                                        });
                                    },
                                }}
                            />
                        ))}
            </SelectableCardGroup>
        </div>
    );

    const right = (
        <div className="flex flex-col gap-y-6">
            <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold">Team Details</h2>
                <p className="text-sm text-gray-400">
                    Provide additional information for your team.
                </p>
            </div>
            <div className="rounded-lg transition-all duration-200">
                <TeamFormFields form={form} />
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
