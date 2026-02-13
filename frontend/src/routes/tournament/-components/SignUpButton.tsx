import { useTeamPlayers } from "@/lib/api/team.queries";
// import { useAuth } from "@/contexts/auth";
import { useDialog } from "@/lib/dialog/DialogProvider";
import { apiPOST } from "@/lib/api/client";
import TeamLogo from "@/components/shared/bracket/atoms/TeamLogo";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { MoveUpRight } from "lucide-react";

const useRegisterTeamForTournament = () => {
    return useMutation({
        mutationFn: ({
            teamId,
            tournamentId,
        }: {
            teamId: number;
            tournamentId: string;
        }) =>
            apiPOST<unknown>(`/tournament/${tournamentId}/register`, {
                teamId,
            }),
        onSuccess: () => {},
        onError: (error) => {
            console.error("Error claiming match:", error);
        },
    });
};

function TeamSignUpDialog({ teamId }: { teamId: number }) {
    const dialog = useDialog();
    const { data: teamPlayers } = useTeamPlayers(teamId.toString());
    const starters = teamPlayers?.filter(
        (player) => player.base_role === "starter",
    );
    const subs = teamPlayers?.filter((player) => player.base_role === "sub");
    const coach = teamPlayers?.filter((player) => player.base_role === "coach");

    return (
        <div className="flex flex-col p-1">
            <section className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Starters</h2>
                    <Link
                        to="/team/$team_id"
                        params={{ team_id: teamId.toString() }}
                        onClick={() => dialog.closeDialog()}
                        className="rounded-md bg-orange-600 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                    >
                        Edit
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    {starters?.map((player) => (
                        <div
                            key={player.id}
                            className="bg-secondBg flex items-center gap-2 rounded-md p-2"
                        >
                            <TeamLogo
                                avatar={player.player_logo ?? undefined}
                                styling="h-6 w-6 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium">
                                {player.player_name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
            {subs && subs.length > 0 && (
                <section className="flex flex-col gap-y-2">
                    <h2 className="pt-4 text-lg font-bold text-white">
                        Substitutes
                    </h2>
                    <div className="flex flex-col gap-2">
                        {subs.map((player) => (
                            <div
                                key={player.id}
                                className="bg-secondBg flex items-center gap-2 rounded-md p-2"
                            >
                                <TeamLogo
                                    avatar={player.player_logo ?? undefined}
                                    styling="h-6 w-6 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">
                                    {player.player_name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {coach && coach.length > 0 && (
                <section className="flex flex-col gap-y-2">
                    <h2 className="pt-4 text-lg font-bold text-white">Coach</h2>
                    <div className="flex flex-col gap-2">
                        {coach.map((player) => (
                            <div
                                key={player.id}
                                className="bg-secondBg flex items-center gap-2 rounded-md p-2"
                            >
                                <TeamLogo
                                    avatar={player.player_logo ?? undefined}
                                    styling="h-6 w-6 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">
                                    {player.player_name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default function SignUpButton({
    tournamentId,
}: {
    tournamentId: string;
}) {
    // const { user, isLoading: isAuthLoading } = useAuth();
    const user = null as any;
    const isAuthLoading = false;

    const { openDialog } = useDialog();

    const registerTeamForTournament = useRegisterTeamForTournament();

    if (isAuthLoading) {
        return null;
    }

    const activeClass =
        "flex w-full items-center justify-center rounded-lg bg-cfRed px-4 py-2 text-xs font-black tracking-widest text-white uppercase shadow-sm transition-all hover:bg-cfRedDark gap-2";

    const getButtonContent = () => {
        if (!user) {
            return { to: "/sign-up", text: "Create Account" };
        }
        if (!user?.teamId) {
            return { to: "/register/team", text: "Create Team To Join" };
        }
        return {
            to: "/register/team",
            text: "Sign Up Team",
            onClick: () =>
                openDialog({
                    title: "Confirm Lineup",
                    content: <TeamSignUpDialog teamId={user.teamId} />,
                    onConfirm: () => {
                        registerTeamForTournament.mutate({
                            teamId: user.teamId,
                            tournamentId,
                        });
                    },
                }),
        };
    };

    const { to, text, onClick } = getButtonContent();

    return onClick ? (
        <button className={activeClass} type="button" onClick={onClick}>
            <div className="flex w-full items-center justify-center gap-2">
                <span className="flex items-center justify-center">{text}</span>
                <MoveUpRight className="flex h-5 w-5 items-center justify-center" />
            </div>
        </button>
    ) : (
        <Link className={activeClass} to={to as any}>
            <div className="flex w-full items-center justify-center gap-2">
                <span className="flex items-center justify-center">{text}</span>
                <MoveUpRight className="flex h-5 w-5 items-center justify-center" />
            </div>
        </Link>
    );
}
