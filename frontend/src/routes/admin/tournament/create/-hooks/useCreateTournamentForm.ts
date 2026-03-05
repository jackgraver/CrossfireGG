import { CreateStageDTO, CreateTournamentContract } from "@repo/contracts";
import { useForm } from "@tanstack/react-form";
import { useCreateTournament } from "@/lib/api/tournament.queries";

export const useCreateTournamentForm = () => {
    const { mutate } = useCreateTournament();

    const toDateInput = (d: Date) => d.toISOString().slice(0, 10);
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    const twoDaysFromNow = new Date(
        new Date().setDate(new Date().getDate() + 2),
    );

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            prize_pool: "",
            is_vrs_enabled: false,
            start_date: toDateInput(tomorrow),
            end_date: toDateInput(twoDaysFromNow),
            stages: [] as CreateStageDTO[],
        },
        validators: {
            CreateTournamentContract,
        },
        onSubmit: async ({ value }: any) => {
            mutate(value);
        },
    } as any);

    return { form };
};
