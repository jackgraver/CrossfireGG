import { tournamentRepository } from "./tournament.repository";
import { stagesRepository } from "./stages/stages.repository";

export const tournamentService = {
    getAllTournaments: async (status?: "active" | "upcoming" | "ended") => {
        const allTournaments = await tournamentRepository.findAll(status);
        return allTournaments;
    },

    getTournamentById: async (tournamentId: number) => {
        const tournament = await tournamentRepository.findTournamentById(tournamentId);

        const stagesWithCounts =
            await tournamentRepository.findStageMatchCountsByTournamentId(tournamentId);

        return {
            ...tournament,
            stages: tournament?.stages.map((s) => ({
                ...s,
                teams_count: stagesWithCounts.find((sc) => sc.stageId === s.id)?.teamsCount || 0,
            })),
        };
    },

    getTournamentByName: async (tournamentId: string) => {
        const tournament = await tournamentRepository.findTournamentByName(tournamentId);

        if (!tournament) return null;

        const stagesWithCounts = await tournamentRepository.findStageMatchCountsByTournamentId(
            tournament.id,
        );

        return {
            ...tournament,
            stages: tournament?.stages.map((s) => ({
                ...s,
                teams_count: stagesWithCounts.find((sc) => sc.stageId === s.id)?.teamsCount || 0,
            })),
        };
    },

    getTeamsByTournamentId: async (tournamentId: number) => {
        const teams = await tournamentRepository.findTeamsByTournamentId(tournamentId);

        const res = teams.map((team) => ({
            timestamp: team.created_at,
            team_name: team.team.name,
            team_faceit_id: team.team.faceit_id,
            players: team.team.players.map((player) => ({
                name: player.player_name,
                faceit_id: player.faceit_id,
                hltv_id: player.hltv_id,
                discord_id: player.discord_id,
            })),
        }));

        return res;
    },

    getRegistrationsByTournamentId: async (tournamentId: number) => {
        const entryStage = await tournamentRepository.findEntryStage(tournamentId);
        if (!entryStage) {
            throw new Error("No entry stage found");
        }

        const teams = await stagesRepository.findAllStageTeams(entryStage.id);

        const res = teams.map((team) => ({
            timestamp: team.created_at,
            team_name: team.team.name,
            team_faceit_id: team.team.faceit_id,
            players: team.team.players.map((player) => ({
                name: player.player_name,
                faceit_id: player.faceit_id,
                hltv_id: player.hltv_id,
                discord_id: player.discord_id,
            })),
        }));

        return res;
    },

    getUpcomingTournament: async () => {
        const upcomingTournament = await tournamentRepository.findUpcomingTournament();
        if (!upcomingTournament) {
            throw new Error("No upcoming tournament found");
        }

        return upcomingTournament;
    },

    getEntryStage: async (tournamentId: number) => {
        const entryStage = await tournamentRepository.findEntryStage(tournamentId);
        if (!entryStage) {
            throw new Error("No entry stage found");
        }
        return entryStage;
    },
};
