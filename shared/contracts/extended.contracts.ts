import z from "zod";
import { StageTeamContract } from "./stage_team.contracts";
import { GroupContract } from "./group.contracts";
import { TeamContract } from "./team.contracts";

export const StageTeamWithTeamContract = StageTeamContract.extend({
    team: TeamContract,
});

export type StageTeamWithTeamDTO = z.infer<typeof StageTeamWithTeamContract>;

export const StageGroupsWithTeams = GroupContract.extend({
    stageTeams: StageTeamWithTeamContract.array(),
}).array();

export type StageGroupsWithTeamsDTO = z.infer<typeof StageGroupsWithTeams>;
