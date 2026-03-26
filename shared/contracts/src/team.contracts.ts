import { z } from "zod";
import { PlayerContract } from "./player.contracts";

export const TeamContract = z.object({
    id: z.number(),
    name: z.string(),
    short_name: z.string(),
    team_logo: z.string().nullable().optional(),
    faceit_id: z.string().nullable().optional(),
    team_captain_id: z.number(),
    social_links: z.string().nullable().optional(),
    placement_summaries: z.array(z.string()).optional(),
});

export type TeamDTO = z.infer<typeof TeamContract>;

export const TeamWithTournamentContract = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        status: z.string(),
        placement: z.string().optional(),
        stages: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                stageTeams: z.array(
                    z.object({
                        id: z.number(),
                        seed: z.number().nullable().optional(),
                        wins: z.number().nullable().optional(),
                        losses: z.number().nullable().optional(),
                    }),
                ),
            }),
        ),
    }),
);

export type TeamWithTournamentDTO = z.infer<typeof TeamWithTournamentContract>;

export const TeamMemberPlayerContract = PlayerContract.extend({
    matches_played: z.number(),
    roster_role: z.enum(["starter", "sub", "coach"]),
});

export type TeamMemberPlayerDTO = z.infer<typeof TeamMemberPlayerContract>;

export const TeamTournamentRosterEntryContract = z.object({
    tournament_id: z.number(),
    tournament_name: z.string(),
    players: z.array(TeamMemberPlayerContract),
});

export type TeamTournamentRosterEntryDTO = z.infer<
    typeof TeamTournamentRosterEntryContract
>;

export const TeamMembersRosterContract = z.object({
    tournament_rosters: z.array(TeamTournamentRosterEntryContract),
    historic_players: z.array(TeamMemberPlayerContract),
});

export type TeamMembersRosterDTO = z.infer<typeof TeamMembersRosterContract>;
