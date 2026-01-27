import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const dateString = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Invalid date");

const numericString = (label: string, opts?: { min?: number }) =>
    z
        .string()
        .min(1, `${label} is required`)
        .refine((v) => {
            const n = Number(v);
            if (!Number.isFinite(n)) return false;
            if (opts?.min !== undefined && n < opts.min) return false;
            return true;
        }, `${label} must be a valid number`);

const faceitChampionshipLink = z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
        (v) => {
            if (!v) return true;
            // must be: https://www.faceit.com/en/championship/<id>...
            return /^https:\/\/www\.faceit\.com\/en\/championship\/[^/?#]+.*$/i.test(v);
        },
        { message: "FACEIT link must look like https://www.faceit.com/en/championship/<id>" },
    );

const stageSchema = z
    .object({
        __id: z.string().optional(),
        name: z.string().min(2, "Stage name is required"),
        faceitId: z.string().optional(),
        faceitLink: faceitChampionshipLink,
        maxTeams: numericString("Max teams", { min: 1 }),
        formatId: z.string().optional(),
        isCurrent: z.boolean(),
        startDate: dateString,
        endDate: dateString,
        registrationDeadline: dateString,
    })
    .superRefine((stage, ctx) => {
        const start = Date.parse(stage.startDate);
        const end = Date.parse(stage.endDate);
        const reg = Date.parse(stage.registrationDeadline);

        if (!Number.isNaN(start) && !Number.isNaN(end) && start > end) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message: "End date must be on/after start date",
            });
        }

        if (!Number.isNaN(reg) && !Number.isNaN(start) && reg > start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["registrationDeadline"],
                message: "Registration deadline must be on/before stage start",
            });
        }
    });

const tournamentSchema = z
    .object({
        name: z.string().min(2, "Tournament name is required"),
        description: z.string().max(500, "Description is too long").optional().or(z.literal("")),
        prizePool: z
            .string()
            .optional()
            .or(z.literal(""))
            .refine((v) => v === undefined || v === "" || (!Number.isNaN(Number(v)) && Number(v) >= 0), {
                message: "Prize pool must be a valid number",
            }),
        startDate: dateString,
        endDate: dateString,
        stages: z.array(stageSchema).min(1, "At least one stage is required"),
    })
    .superRefine((t, ctx) => {
        const start = Date.parse(t.startDate);
        const end = Date.parse(t.endDate);
        if (!Number.isNaN(start) && !Number.isNaN(end) && start > end) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["endDate"],
                message: "End date must be on/after start date",
            });
        }
    });

export const useCreateTournamentForm = () => {
    const toDateInput = (d: Date) => d.toISOString().slice(0, 10);
    const today = new Date();
    // NOTE: Keeping this loosely typed for now (admin page is WIP and the user
    // explicitly doesn't need strict type-checking yet).
    const form: any = useForm({
        defaultValues: {
            name: "",
            description: "",
            prizePool: "",
            startDate: toDateInput(today),
            endDate: toDateInput(today),
            stages: [] as any[],
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
