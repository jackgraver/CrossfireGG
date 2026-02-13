import StepContainer from "../-components/StepContainer";
import FinishScreen from "../-components/FinishScreen";

type StepFinishedProps = {
    tournamentId?: string;
    tournamentName?: string;
    onJoinTournament: () => void;
    onBrowseTournaments: () => void;
    onViewTeam: () => void;
};

export default function StepFinished({
    tournamentId,
    tournamentName,
    onJoinTournament,
    onBrowseTournaments,
    onViewTeam,
}: StepFinishedProps) {
    const left = (
        <FinishScreen
            tournamentId={tournamentId}
            tournamentName={tournamentName}
            onJoinTournament={onJoinTournament}
            onBrowseTournaments={onBrowseTournaments}
            onViewTeam={onViewTeam}
        />
    );

    return <StepContainer left={left} right={<div />} />;
}
