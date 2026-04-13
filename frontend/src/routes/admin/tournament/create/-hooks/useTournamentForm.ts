import type { CreateStageDTO, TournamentForEditDTO } from "@repo/contracts";
import { useForm } from "@tanstack/react-form";
import { useCreateTournament, useUpdateTournament } from "@/lib/api/tournament.queries";
import { toastService } from "@/components/shared/toast/toastService";
import { useNavigate } from "@tanstack/react-router";

const toDateInput = (d: Date | string | null | undefined) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toISOString().slice(0, 10);
};

type UseTournamentFormOptions = {
    tournamentId?: string;
    initialData?: TournamentForEditDTO;
};

export const useTournamentForm = (opts?: UseTournamentFormOptions) => {
    const isEditMode = !!opts?.tournamentId && !!opts?.initialData;
    const navigate = useNavigate();
    const createMutation = useCreateTournament();
    const updateMutation = useUpdateTournament();

    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
    const twoDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 2));

    const defaultValues = isEditMode
        ? {
              name: opts.initialData!.name,
              description: opts.initialData!.description ?? "",
              prize_pool: opts.initialData!.prize_pool?.toString() ?? "",
              is_vrs_enabled: opts.initialData!.is_vrs_enabled ?? false,
              start_date: toDateInput(opts.initialData!.start_date),
              end_date: toDateInput(opts.initialData!.end_date),
              stages: opts.initialData!.stages.map((s) => ({
                  __id: `existing-${s.id}`,
                  _serverId: s.id,
                  name: s.name,
                  faceit_id: s.faceit_id ?? "",
                  max_teams: s.max_teams.toString(),
                  format_id: s.format_id.toString(),
                  is_current: s.is_current,
                  is_entry_stage: s.is_entry_stage,
                  start_date: toDateInput(s.start_date),
                  end_date: toDateInput(s.end_date),
                  registration_deadline: toDateInput(s.registration_deadline),
              })),
          }
        : {
              name: "",
              description: "",
              prize_pool: "",
              is_vrs_enabled: false,
              start_date: toDateInput(tomorrow),
              end_date: toDateInput(twoDaysFromNow),
              stages: [] as (CreateStageDTO & {
                  __id: string;
                  _serverId?: number;
              })[],
          };

    const form = useForm({
        defaultValues,
        onSubmit: async ({ value }: any) => {
            const payload = {
                ...value,
                stages: value.stages.map((s: any) => ({
                    ...(s._serverId ? { id: s._serverId } : {}),
                    name: s.name,
                    faceit_id: s.faceit_id,
                    max_teams: s.max_teams,
                    format_id: s.format_id,
                    is_current: s.is_current,
                    is_entry_stage: s.is_entry_stage,
                    start_date: s.start_date,
                    end_date: s.end_date,
                    registration_deadline: s.registration_deadline,
                })),
            };

            if (isEditMode) {
                updateMutation.mutate(
                    {
                        tournamentId: opts.tournamentId!,
                        payload,
                    },
                    {
                        onSuccess: () => {
                            toastService.success("Tournament updated successfully");
                            navigate({ to: "/admin" });
                        },
                        onError: (error: any) => {
                            const msg =
                                error?.response?.data?.message ||
                                error?.response?.data?.error ||
                                "Failed to update tournament";
                            toastService.error("Update failed", msg);
                        },
                    },
                );
            } else {
                createMutation.mutate(payload, {
                    onSuccess: () => {
                        toastService.success("Tournament created successfully");
                        navigate({ to: "/admin" });
                    },
                    onError: (error: any) => {
                        const msg =
                            error?.response?.data?.message ||
                            error?.response?.data?.error ||
                            "Failed to create tournament";
                        toastService.error("Creation failed", msg);
                    },
                });
            }
        },
    } as any);

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    return { form, isEditMode, isSubmitting };
};
