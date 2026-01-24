import { useTeamPlayers } from '@/app/team/-queries/team.queries';
import UserForm from '@/shared/UserForm';
import { createFileRoute } from '@tanstack/react-router'
import { SelectableCardGroup } from '../../team/-components/SelectableCardGroup';
import SelectableCard from '../../team/-components/SelectableCard';
import { useState } from 'react';

export const Route = createFileRoute('/register/tournament/$tournamentId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { tournamentId } = Route.useParams();
    const { data: players, isLoading, error } = useTeamPlayers(tournamentId);

    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (players !== undefined && players.length === 0) {
        return <div>No players found</div>;
    }

    return (
        <UserForm>
            <div className="flex w-full flex-col gap-y-4">
                <h1>Choose Starting Players</h1>
                <SelectableCardGroup
                    min={0}
                    value={selectedPlayers}
                    onChange={(value) => setSelectedPlayers([...selectedPlayers, ...value])}>
                    {players?.map((player) => (
                        <SelectableCard id={player.id.toString()} avatar={player.player_logo ?? ''} name={player.player_name} />
                    ))}
                </SelectableCardGroup>
            </div>
        </UserForm>
    );
}
