import { useForm } from "@tanstack/react-form";
import { useRegisterTeam } from "../-queries/registerTeam.queries";
import { RegistrationFormData } from "../-types/registration.types";

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
            subs: [],
            coach: {
                faceitId: "",
                hltvLink: "",
                discordId: "",
                playerName: "",
                nationality: "",
                avatar: "",
            },
            agreements: {
                rulesAndGuidelines: false,
                discordConfirmation: false,
            },
        } satisfies RegistrationFormData,
        onSubmit: async ({ value }) => {
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
