import { useTeamPlayers } from '@/app/team/-queries/team.queries';
import UserForm from '@/shared/UserForm';
import { createFileRoute } from '@tanstack/react-router'
import { SelectableCardGroup } from '../../team/-components/SelectableCardGroup';
import SelectableCard from '../../team/-components/SelectableCard';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useRegisterTournament } from './-queries/registerTournament.queries';
import { useForm, useStore } from '@tanstack/react-form';

export const Route = createFileRoute('/register/tournament/$tournamentId/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { tournamentId } = Route.useParams();
    const { user } = useAuth();
    const { data: players, isLoading, error } = useTeamPlayers(user?.teamId.toString() ?? ''); //todo fail state if no team id?

    const registerTournamentMutation = useRegisterTournament();

    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const form = useForm({
        defaultValues: {
            startersIds: [] as string[],
            subsIds: [] as string[],
            coachId: '' as string,
            agreements: {
                rulesAndGuidelines: false,
                discordConfirmation: false,
            },
        },
        onSubmit: async ({ value }) => {
            registerTournamentMutation.mutate({
                tournamentId: tournamentId,
                teamId: user?.teamId.toString() ?? '',
                playerIds: value.startersIds,
                subIds: value.subsIds,
                coachId: value.coachId,
                agreements: value.agreements,
            });
        },
    });

    const startersIds = useStore(form.store, (state) => state.values.startersIds);
    const subsIds = useStore(form.store, (state) => state.values.subsIds);
    const coachId = useStore(form.store, (state) => state.values.coachId);

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
        <div className="fixed inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex h-[560px] w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                <div className="flex h-full w-1/2 flex-col items-center justify-center p-8 text-center">
                    <h1>Choose Starting Players</h1>
                    {startersIds.map((id) => (
                        <div key={id}>{id}</div>
                    ))}
                    <h1>Choose Substitutes</h1>
                    {subsIds.map((id) => (
                        <div key={id}>{id}</div>
                    ))}
                    <h1>Choose Coach</h1>
                    {coachId && <div>{coachId}</div>}
                </div>
                <div className="flex h-full w-1/2 flex-col items-center justify-center p-8 text-center">
                    <div className="flex w-full flex-col gap-y-4">
                        <h1>Choose Starting Players</h1>
                        <form.Field
                            name="startersIds"
                            children={(field) => (
                                <SelectableCardGroup
                                    min={0}
                                    value={field.state.value}
                                    onChange={field.handleChange}>
                                    {players?.map((player) => (
                                        <SelectableCard key={player.id.toString()} id={player.id.toString()} avatar={player.player_logo ?? ''} name={player.player_name} />
                                    ))}
                                </SelectableCardGroup>
                            )}
                        />
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                        <button
                            type="submit"
                            onClick={() => { }}//form.handleSubmit()}
                            className="flex-1 rounded bg-green-600 px-6 py-2 font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
