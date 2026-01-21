import { useTeamPlayers } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import { Loader2 } from "lucide-react";

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

    const { data: teamPlayers, isLoading, error } = useTeamPlayers(teamId);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (teamPlayers?.players?.length === 0) {
        return <div>No players found</div>;
    }

    console.log(teamPlayers);

    const captainOnTop = teamPlayers?.players
        ? [...teamPlayers.players].sort((a, b) =>
            a.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d" ? -1 :
                b.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d" ? 1 :
                    0
        )
        : teamPlayers?.players ?? [];

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                Select up to 5 Players
            </h1>
            {isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-cfRed" />
                    <h1 className="text-2xl font-bold text-white">Loading players...</h1>
                </div>
            ) : (
                <SelectableCardGroup
                    min={0}
                    value={selectedPlayerIds}
                    onChange={onSelectionChange}
                >
                    <div className="flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-auto">
                        {captainOnTop.map((player) => (
                            <SelectableCard
                                key={player.user_id}
                                id={player.user_id}
                                avatar={player.avatar}
                                name={player.nickname}
                                disabled={player.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d"}
                            />
                        ))}
                    </div>
                </SelectableCardGroup>
            )}
        </>
    );
}
