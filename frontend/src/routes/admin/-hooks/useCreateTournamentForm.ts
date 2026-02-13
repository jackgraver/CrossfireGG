import {
    CreateStageContract,
    CreateStageDTO,
    CreateTournamentContract,
} from "@repo/contracts";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const tournamentSchema = CreateTournamentContract.extend({
    stages: z.array(CreateStageContract),
});

export const useCreateTournamentForm = () => {
    const toDateInput = (d: Date) => d.toISOString().slice(0, 10);
    const today = new Date();
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            prize_pool: "",
            is_vrs_enabled: false,
            start_date: toDateInput(today),
            end_date: toDateInput(today),
            stages: [] as CreateStageDTO[],
        },
        validators: {
            onChange: tournamentSchema,
        },
        onSubmit: async ({ value }: any) => {
            console.log(value);
        },
    } as any);

    return { form };
};
