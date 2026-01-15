import z from "zod";
import { GroupContract, StageTeamContract } from ".";
import { TeamContract } from ".";

export const StageTeamWithTeamContract = StageTeamContract.extend({
    team: TeamContract,
});

export type StageTeamWithTeamDTO = z.infer<typeof StageTeamWithTeamContract>;

export const StageGroupsWithTeams = GroupContract.extend({
    stageTeams: StageTeamWithTeamContract.array(),
}).array();

export type StageGroupsWithTeamsDTO = z.infer<typeof StageGroupsWithTeams>;
