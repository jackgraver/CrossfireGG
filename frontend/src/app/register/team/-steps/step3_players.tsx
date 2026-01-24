import { useTeamPlayers } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";
import { Loader2 } from "lucide-react";

type RegisterStep3PlayersProps = {
    teamId: string;
    selectedPlayerIds: string[];
    onSelectionChange: (ids: string[]) => void;
    alreadySelectedPlayerIds: string[];
    mode: "players" | "subs" | "coaches";
};

export default function RegisterStep3Players({
    teamId,
    selectedPlayerIds,
    onSelectionChange,
    alreadySelectedPlayerIds,
    mode,
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

    const captainOnTop = teamPlayers?.players
        ? [...teamPlayers.players].sort((a, b) =>
            a.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d" ? -1 :
                b.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d" ? 1 :
                    0
        ).sort((a, b) =>
            alreadySelectedPlayerIds.includes(a.user_id) ? 1 :
                alreadySelectedPlayerIds.includes(b.user_id) ? -1 :
                    0
        )
        : teamPlayers?.players ?? [];

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">
                {mode === "players" ? "Select All Starting Players" : mode === "subs" ? "Select All Substitutes" : "Select All Coaches"}
            </h1>
            {isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-cfRed" />
                    <h1 className="text-2xl font-bold text-white">Loading players...</h1>
                </div>
            ) : (
                <SelectableCardGroup
                    min={mode === "players" ? 1 : 0}
                    value={selectedPlayerIds}
                    onChange={onSelectionChange}
                >
                    {captainOnTop.map((player) => (
                        <SelectableCard
                            key={player.user_id}
                            id={player.user_id}
                            avatar={player.avatar}
                            name={player.nickname}
                            disabled={player.user_id === "2abbf5d5-ae35-40a1-bf6c-cf19c844168d" || alreadySelectedPlayerIds.includes(player.user_id)}
                        />
                    ))}
                </SelectableCardGroup>
            )}
        </>
    );
}
