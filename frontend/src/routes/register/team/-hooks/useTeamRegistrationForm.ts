import { useForm } from "@tanstack/react-form";
import { useRegisterTeam } from "../-queries/registerTeam.queries";
import { Player, RegistrationFormData } from "../-types/registration.types";

type UseTeamRegistrationFormOptions = {
    userFaceitId?: string | null;
    tournamentId?: string | null;
    onSuccess?: (result: any) => void;
    onError?: (error: unknown) => void;
};

export function useTeamRegistrationForm(options: UseTeamRegistrationFormOptions = {}) {
    const registerMutation = useRegisterTeam();

    const form = useForm({
        defaultValues: {
            team: {
                teamId: "",
                name: "",
                twitter: "",
                captainFaceitId: options.userFaceitId ?? "",
                logo: "",
            },
            starters: options.userFaceitId
                ? [
                      {
                          faceitId: options.userFaceitId,
                          hltvLink: "",
                          discordId: "",
                          playerName: "",
                          nationality: "",
                          avatar: "",
                      },
                  ]
                : [],
            subs: [] as Player[],
            coach: [] as Player[],
            agreements: {
                rulesAndGuidelines: false,
                discordConfirmation: false,
            },
        } satisfies RegistrationFormData,
        onSubmit: ({ value }) => {
            registerMutation.mutate(
                {
                    team: value.team,
                    starters: value.starters,
                    subs: value.subs,
                    coach: value.coach,
                    tournamentId: options.tournamentId ?? null,
                },
                {
                    onSuccess: options.onSuccess,
                    onError: options.onError,
                },
            );
        },
    });

    return { form, registerMutation };
}
