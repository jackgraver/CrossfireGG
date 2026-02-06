import { stagesRepository } from "./stages.repository";

export const stagesService = {
    getMatchesByStageId: async (stageId: number) => {
        const matches = await stagesRepository.findMatchesByStageId(stageId);
        return matches;
    },

    getStageBracket: async (stageId: number) => {
        const stage = await stagesRepository.findStageStandings(stageId);

        return {
            format: stage?.stageFormat,
            groups: stage?.groups,
        };
    },

    getStageTeams: async (stageId: number) => {
        return await stagesRepository.findAllStageTeams(stageId);
    },
};
