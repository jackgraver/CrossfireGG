import type { Group, Team } from "@repo/contracts";

export type GroupWithTeams = Group & {
    teams: Team[];
};
