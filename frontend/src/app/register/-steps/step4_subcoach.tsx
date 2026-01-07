import { useTeamPlayers } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";

type RegisterStep4SubCoachProps = {
    teamId: string;
    excludedPlayerIds: string[];
    selectedSubCoachIds: string[];
    onSelectionChange: (ids: string[]) => void;
};

export default function RegisterStep4SubCoach({
    teamId,
    excludedPlayerIds,
    selectedSubCoachIds,
    onSelectionChange,
}: RegisterStep4SubCoachProps) {
    if (!teamId) {
        return <div>No team selected</div>;
    }

    const { data: teamPlayers } = useTeamPlayers(teamId);

    if (!teamPlayers?.players || teamPlayers.players.length === 0) {
        return <div>No players found for this team</div>;
    }

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Select up to 3 Subsitites
            </h1>
            <SelectableCardGroup
                min={0}
                max={3}
                value={selectedSubCoachIds}
                onChange={onSelectionChange}
            >
                <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-auto">
                    {teamPlayers.players.map((player) => (
                        <SelectableCard
                            key={player.user_id}
                            id={player.user_id}
                            avatar={player.avatar}
                            name={player.nickname}
                            disabled={excludedPlayerIds.includes(
                                player.user_id,
                            )}
                        />
                    ))}
                </div>
            </SelectableCardGroup>
        </>
    );
}
