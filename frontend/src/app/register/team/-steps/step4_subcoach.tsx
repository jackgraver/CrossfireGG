import { useTeamPlayers } from "../-queries/registerQueries";
import SelectableCard from "../-components/SelectableCard";
import { SelectableCardGroup } from "../-components/SelectableCardGroup";

type SubsProps = {
    mode: "subs";
    teamId: string;
    excludedPlayerIds: string[];
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
};

type CoachProps = {
    mode: "coach";
    teamId: string;
    excludedPlayerIds: string[];
    selectedId: string;
    onSelectionChange: (id: string) => void;
};

type RegisterStep4SubCoachProps = SubsProps | CoachProps;

export default function RegisterStep4SubCoach(
    props: RegisterStep4SubCoachProps,
) {
    const { mode, teamId, excludedPlayerIds } = props;

    if (!teamId) {
        return <div>No team selected</div>;
    }

    const { data: teamPlayers } = useTeamPlayers(teamId);

    const sortedPlayers = teamPlayers?.players?.slice().sort((a, b) => {
        const aExcluded = excludedPlayerIds.includes(a.user_id);
        const bExcluded = excludedPlayerIds.includes(b.user_id);
        if (aExcluded && !bExcluded) return 1;
        if (!aExcluded && bExcluded) return -1;
        return 0;
    });

    if (!sortedPlayers || sortedPlayers.length === 0) {
        return <div>No players found for this team</div>;
    }

    const isSubs = mode === "subs";
    const title = isSubs
        ? "Select up to 3 Substitutes"
        : "Select a Coach (Optional)";
    const min = 0;
    const max = isSubs ? 3 : 1;
    const value = isSubs
        ? props.selectedIds
        : props.selectedId
            ? [props.selectedId]
            : [];
    const handleChange = isSubs
        ? props.onSelectionChange
        : (ids: string[]) => props.onSelectionChange(ids[0] ?? "");

    return (
        <>
            <h1 className="mb-2 text-2xl font-bold text-white">{title}</h1>
            <SelectableCardGroup
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            >
                {sortedPlayers.map((player) => (
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
            </SelectableCardGroup>
        </>
    );
}
