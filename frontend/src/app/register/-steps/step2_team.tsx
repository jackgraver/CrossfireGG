import { usePlayerFaceitTeams } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import { useNavigate } from "@tanstack/react-router";

type RegisterStep2TeamProps = {
    selectedTeamId: string[];
    onSelectionChange: any;
};

export default function RegisterStep2Team({
    selectedTeamId,
    onSelectionChange,
}: RegisterStep2TeamProps) {
    const navigate = useNavigate();

    const { data: playerFaceitTeams } = usePlayerFaceitTeams(
        "2abbf5d5-ae35-40a1-bf6c-cf19c844168d",
    );

    if (playerFaceitTeams?.teams.length === 0) {
        return (
            <div>
                <p>No Faceit teams found</p>
            </div>
        );
    }

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Select your team
            </h1>
            <SelectableCardGroup
                min={1}
                max={1}
                value={selectedTeamId}
                onChange={(value) => onSelectionChange(value[0])}
            >
                <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-auto">
                    {playerFaceitTeams?.teams.map((team) => (
                        <SelectableCard
                            key={team.team_id}
                            id={team.team_id}
                            avatar={team.avatar}
                            name={team.name}
                            disabled={team.isRegistered} //TODO: Sign up flow for existing team here too
                            disabledAction={{
                                label: "Team Already Registered",
                                onClick: () => {
                                    navigate({
                                        to: `/team/$team_id`,
                                        params: { team_id: team.team_id },
                                    });
                                },
                            }}
                        />
                    ))}
                </div>
            </SelectableCardGroup>
        </>
    );
}
