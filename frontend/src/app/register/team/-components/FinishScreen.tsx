type FinishScreenProps = {
    tournamentId?: string;
    tournamentName?: string;
    onJoinTournament: () => void;
    onBrowseTournaments: () => void;
    onViewTeam: () => void;
};

export default function FinishScreen({
    tournamentId,
    tournamentName,
    onJoinTournament,
    onBrowseTournaments,
    onViewTeam,
}: FinishScreenProps) {
    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <h1 className="mb-4 text-2xl font-bold">You have been registered successfully!</h1>
            {tournamentId ? (
                <button
                    className="w-full max-w-xs rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-600"
                    onClick={onJoinTournament}
                >
                    Join {tournamentName ?? "Tournament"}
                </button>
            ) : (
                <button
                    className="w-full max-w-xs rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-600"
                    onClick={onBrowseTournaments}
                >
                    Browse Tournaments
                </button>
            )}
            <button
                className="w-full max-w-xs rounded bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-red-800"
                onClick={onViewTeam}
            >
                View Team Page
            </button>
        </div>
    );
}
