import { useTeamPlayers } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";

type RegisterStep3PlayersProps = {
    teamId: string;
    selectedPlayerIds: string[];
    onSelectionChange: (ids: string[]) => void;
};

export default function RegisterStep3Players({
    teamId,
    selectedPlayerIds,
    onSelectionChange,
}: RegisterStep3PlayersProps) {
    if (!teamId) {
        return <div>No team selected</div>;
    }

    const { data: teamPlayers } = useTeamPlayers(teamId);

    if (teamPlayers?.players?.length === 0) {
        return <div>No players found</div>;
    }

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Select up to 5 Players
            </h1>
            <SelectableCardGroup
                min={5}
                max={5}
                value={selectedPlayerIds}
                onChange={onSelectionChange}
            >
                <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-auto">
                    {teamPlayers?.players?.map((player) => (
                        <SelectableCard
                            key={player.user_id}
                            id={player.user_id}
                            avatar={player.avatar}
                            name={player.nickname}
                        />
                    ))}
                </div>
            </SelectableCardGroup>
        </>
    );
}
