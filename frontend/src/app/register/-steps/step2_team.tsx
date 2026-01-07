import { usePlayerFaceitTeams } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";

type RegisterStep2TeamProps = {
    selectedTeamId: string[];
    onSelectionChange: any;
};

export default function RegisterStep2Team({
    selectedTeamId,
    onSelectionChange,
}: RegisterStep2TeamProps) {
    const { data: playerFaceitTeams } = usePlayerFaceitTeams(
        "c7b709f5-281b-4133-859e-0d545c4c58d0",
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
                            disabled={team.exists} //TODO: Sign up flow for existing team here too
                        />
                    ))}
                </div>
            </SelectableCardGroup>
        </>
    );
}
