import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies before importing service
vi.mock("../../core/logger", () => ({
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../players/player.repository", () => ({
    playerRepository: {
        findByFaceitIds: vi.fn(),
        findByFaceitId: vi.fn(),
        upsertPlayerStats: vi.fn(),
        upsertPlayerByFaceitId: vi.fn(),
    },
}));

vi.mock("../tournaments/tournament.repository", () => ({
    tournamentRepository: {
        findById: vi.fn(),
        findStageById: vi.fn(),
        upsertStageByFaceitId: vi.fn(),
        upsertGroupByName: vi.fn(),
    },
}));

vi.mock("../teams/team.repository", () => ({
    teamRepository: {
        findStageTeamByFaceitId: vi.fn(),
        findStageTeamsByFaceitIds: vi.fn(),
        bulkUpdateAvatars: vi.fn(),
        incrementStageTeamRecord: vi.fn(),
        countStageTeams: vi.fn(),
        upsertTournamentPlacementByTeamAndStage: vi.fn(),
        updateTeamAvatarByFaceitId: vi.fn(),
    },
}));

vi.mock("../tournaments/stages/stages.repository", () => ({
    stagesRepository: {
        findStageFormatById: vi.fn(),
    },
}));

vi.mock("../matches/match.repository", () => ({
    matchRepository: {
        findAllByStageId: vi.fn(),
        upsertMatchByFaceitId: vi.fn(),
        upsertMatchParticipant: vi.fn(),
        upsertMap: vi.fn(),
    },
}));

vi.mock("../../utils/faceitFetch.util", () => ({
    faceitFetchUtil: {
        fetchData: vi.fn(),
    },
}));

vi.mock("../../utils/transformFaceitData", () => ({
    transformFaceitTournament: vi.fn(),
    transformFaceitMatch: vi.fn(),
    transformFaceitMatchParticipants: vi.fn(),
    transformFaceitMaps: vi.fn(),
}));

import { faceitImportService } from "./faceit.service";
import { logger } from "../../core/logger";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "../tournaments/tournament.repository";
import { teamRepository } from "../teams/team.repository";
import { matchRepository } from "../matches/match.repository";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { stagesRepository } from "../tournaments/stages/stages.repository";
import * as transformHelpers from "../../utils/transformFaceitData";

// Fixture builders
const createMockFaceitMatch = (overrides = {}) => ({
    match_id: "m1",
    teams: {
        faction1: {
            faction_id: "f1",
            roster: [{ player_id: "p1" }, { player_id: "p2" }],
        },
        faction2: {
            faction_id: "f2",
            roster: [{ player_id: "p3" }, { player_id: "p4" }],
        },
    },
    status: "FINISHED",
    results: { winner: "faction1" },
    ...overrides,
});

describe("faceitImportService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(teamRepository.countStageTeams).mockResolvedValue(16);
        vi.mocked(stagesRepository.findStageFormatById).mockResolvedValue(
            null,
        );
        vi.mocked(playerRepository.upsertPlayerByFaceitId).mockResolvedValue(
            {} as any,
        );
        vi.mocked(faceitFetchUtil.fetchData).mockResolvedValue(null);
    });

    describe("importStage", () => {
        it("should throw error if tournament not found", async () => {
            vi.mocked(tournamentRepository.findById).mockResolvedValue(
                null as any,
            );
            await expect(
                faceitImportService.importStage({} as any, 1),
            ).rejects.toThrow("Tournament with ID 1 not found");
        });

        it("should transform and upsert stage", async () => {
            const mockChampionship = { championship_id: "c1" } as any;
            vi.mocked(tournamentRepository.findById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(
                transformHelpers.transformFaceitTournament,
            ).mockResolvedValue({ name: "Stage 1" } as any);
            vi.mocked(
                tournamentRepository.upsertStageByFaceitId,
            ).mockResolvedValue({ id: 10 } as any);

            const result = await faceitImportService.importStage(
                mockChampionship,
                1,
            );

            expect(
                tournamentRepository.upsertStageByFaceitId,
            ).toHaveBeenCalledWith({ name: "Stage 1" });
            expect(result).toEqual({ id: 10 });
        });
    });

    describe("processNewStageMatches", () => {
        it("should return 0 if no matches provided", async () => {
            const result = await faceitImportService.processNewStageMatches(
                [],
                1,
            );
            expect(result).toEqual({ newMatchesCount: 0 });
            expect(logger.info).toHaveBeenCalledWith("No matches to import");
        });

        it("should throw if stage not found", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue(
                null as any,
            );
            await expect(
                faceitImportService.processNewStageMatches([{} as any], 1),
            ).rejects.toThrow("Stage with ID 1 not found");
        });

        it("should filter out existing matches and process new ones", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([
                { faceit_id: "existing", status: "finished" },
            ] as any);

            const newMatch = createMockFaceitMatch({ match_id: "new" });
            const existingMatch = createMockFaceitMatch({
                match_id: "existing",
            });

            // Setup mocks for processing the new match
            vi.mocked(teamRepository.findStageTeamByFaceitId).mockResolvedValue(
                { id: 100, team_id: 10 } as any,
            );
            vi.mocked(playerRepository.findByFaceitIds).mockResolvedValue([
                { id: 1 },
                { id: 2 },
            ] as any);

            // Mock processStageMatch (internal call but we mock the repo calls it makes or the function if we could,
            // but here it's exported in the same object, so we mock the repo calls it triggers)
            vi.mocked(transformHelpers.transformFaceitMatch).mockReturnValue(
                {} as any,
            );
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 500,
            } as any);
            vi.mocked(
                transformHelpers.transformFaceitMatchParticipants,
            ).mockReturnValue([{}, {}] as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );

            const result = await faceitImportService.processNewStageMatches(
                [existingMatch, newMatch] as any,
                1,
            );

            expect(result.newMatchesCount).toBe(1);
            expect(matchRepository.upsertMatchByFaceitId).toHaveBeenCalledTimes(
                1,
            );
        });

        it("should skip match if stage teams are missing", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(teamRepository.findStageTeamByFaceitId).mockResolvedValue(
                undefined,
            );

            const match = createMockFaceitMatch();
            const result = await faceitImportService.processNewStageMatches(
                [match] as any,
                1,
            );

            expect(result.newMatchesCount).toBe(0);
            expect(logger.warn).toHaveBeenCalledWith(
                expect.stringContaining("Stage teams not found"),
            );
        });

        it("imports match even when full roster validation is not enforced in service", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(teamRepository.findStageTeamByFaceitId).mockResolvedValue(
                { id: 100, team_id: 10 } as any,
            );
            vi.mocked(transformHelpers.transformFaceitMatch).mockReturnValue(
                {} as any,
            );
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 500,
            } as any);
            vi.mocked(
                transformHelpers.transformFaceitMatchParticipants,
            ).mockReturnValue([{}, {}] as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );
            const match = createMockFaceitMatch({
                teams: {
                    faction1: {
                        faction_id: "f1",
                        roster: [{ player_id: "p1" }, { player_id: "p2" }],
                    },
                    faction2: {
                        faction_id: "f2",
                        roster: [{ player_id: "p3" }],
                    },
                },
            });
            const result = await faceitImportService.processNewStageMatches(
                [match] as any,
                1,
            );
            expect(result.newMatchesCount).toBe(1);
        });

        it("assigns 3rd and 4th for single elim bronze when both teams have a loss before the match", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
                format_id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(teamRepository.countStageTeams).mockResolvedValue(16 as any);
            vi.mocked(stagesRepository.findStageFormatById).mockResolvedValue({
                name: "single elimination",
            } as any);
            vi.mocked(teamRepository.findStageTeamByFaceitId)
                .mockResolvedValueOnce({
                    id: 100,
                    team_id: 10,
                    losses: 1,
                } as any)
                .mockResolvedValueOnce({
                    id: 101,
                    team_id: 20,
                    losses: 1,
                } as any);
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 500,
            } as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );
            vi.mocked(transformHelpers.transformFaceitMatch).mockReturnValue(
                {} as any,
            );
            vi.mocked(
                transformHelpers.transformFaceitMatchParticipants,
            ).mockReturnValue([{}, {}] as any);
            const match = createMockFaceitMatch({
                match_id: "bronze",
                round: 4,
                status: "FINISHED",
                results: { winner: "faction1" },
            });
            await faceitImportService.processNewStageMatches([match] as any, 1);
            expect(
                teamRepository.upsertTournamentPlacementByTeamAndStage,
            ).toHaveBeenCalledWith(10, 1, "3rd");
            expect(
                teamRepository.upsertTournamentPlacementByTeamAndStage,
            ).toHaveBeenCalledWith(20, 1, "4th");
        });

        it("should increment team records for finished matches with a winner", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
                format_id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(teamRepository.countStageTeams).mockResolvedValue(16 as any);
            vi.mocked(stagesRepository.findStageFormatById).mockResolvedValue({
                name: "single elimination",
            } as any);
            vi.mocked(teamRepository.findStageTeamByFaceitId).mockResolvedValue(
                { id: 100, team_id: 10, losses: 0 } as any,
            );
            vi.mocked(playerRepository.findByFaceitIds).mockResolvedValue([
                { id: 1 },
                { id: 2 },
            ] as any);

            // Mock successful match processing
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 500,
            } as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );
            vi.mocked(transformHelpers.transformFaceitMatch).mockReturnValue(
                {} as any,
            );
            vi.mocked(
                transformHelpers.transformFaceitMatchParticipants,
            ).mockReturnValue([{}, {}] as any);

            const match = createMockFaceitMatch({
                status: "FINISHED",
                results: { winner: "faction1" },
            });
            await faceitImportService.processNewStageMatches([match] as any, 1);

            expect(
                teamRepository.incrementStageTeamRecord,
            ).toHaveBeenCalledWith(10, 1, 1, 0); // Team 1 won
            expect(
                teamRepository.incrementStageTeamRecord,
            ).toHaveBeenCalledWith(10, 1, 0, 1); // Team 2 lost (mocked same team_id for simplicity)
        });
    });

    describe("processStageMatch", () => {
        it("should upsert match, participants and process stats if available", async () => {
            const faceitMatch = createMockFaceitMatch();
            const stageTeam1 = { id: 1, team_id: 10 };
            const stageTeam2 = { id: 2, team_id: 20 };

            vi.mocked(transformHelpers.transformFaceitMatch).mockReturnValue({
                id: "m1",
            } as any);
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 100,
            } as any);
            vi.mocked(
                transformHelpers.transformFaceitMatchParticipants,
            ).mockReturnValue([{ team_id: 10 }, { team_id: 20 }] as any);
            vi.mocked(matchRepository.upsertMatchParticipant)
                .mockResolvedValueOnce({ id: 1001 } as any)
                .mockResolvedValueOnce({ id: 1002 } as any);

            // Mock stats fetch
            const mockStats = {
                rounds: [
                    {
                        round_stats: {
                            Score: "13 / 8",
                            Winner: "f1",
                            Map: "de_dust2",
                        },
                        teams: [
                            {
                                players: [
                                    {
                                        player_id: "p1",
                                        player_stats: {
                                            Kills: "20",
                                            Deaths: "10",
                                            Assists: "5",
                                            ADR: "100",
                                            Damage: "2000",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            vi.mocked(faceitFetchUtil.fetchData).mockResolvedValue(mockStats);
            vi.mocked(matchRepository.upsertMap).mockResolvedValue({
                id: 50,
            } as any);
            vi.mocked(playerRepository.findByFaceitId).mockResolvedValue({
                id: 1,
            } as any);

            const result = await faceitImportService.processStageMatch(
                faceitMatch as any,
                1,
                null,
                stageTeam1,
                stageTeam2,
            );

            expect(result).toBe(true);
            expect(matchRepository.upsertMatchByFaceitId).toHaveBeenCalled();
            expect(
                matchRepository.upsertMatchParticipant,
            ).toHaveBeenCalledTimes(2);
            expect(matchRepository.upsertMap).toHaveBeenCalled();
            expect(playerRepository.upsertPlayerStats).toHaveBeenCalled();
        });

        it("should fallback to detailed_results if stats fetch fails or is empty", async () => {
            const faceitMatch = createMockFaceitMatch({
                detailed_results: [{ winner: "faction1" }],
            });
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 100,
            } as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );

            vi.mocked(faceitFetchUtil.fetchData).mockResolvedValue(null);
            vi.mocked(transformHelpers.transformFaceitMaps).mockReturnValue([
                { map_name: "mirage" },
            ] as any);

            await faceitImportService.processStageMatch(
                faceitMatch as any,
                1,
                null,
                { id: 1, team_id: 10 },
                { id: 2, team_id: 20 },
            );

            expect(transformHelpers.transformFaceitMaps).toHaveBeenCalled();
            expect(matchRepository.upsertMap).toHaveBeenCalledWith({
                map_name: "mirage",
            });
        });

        it("should handle group upsert if match has a group", async () => {
            const faceitMatch = createMockFaceitMatch({ group: "Group A" });
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(teamRepository.findStageTeamByFaceitId).mockResolvedValue(
                { id: 100, team_id: 10 } as any,
            );
            vi.mocked(playerRepository.findByFaceitIds).mockResolvedValue([
                { id: 1 },
                { id: 2 },
            ] as any);

            vi.mocked(tournamentRepository.upsertGroupByName).mockResolvedValue(
                { id: 500 } as any,
            );
            vi.mocked(matchRepository.upsertMatchByFaceitId).mockResolvedValue({
                id: 100,
            } as any);
            vi.mocked(matchRepository.upsertMatchParticipant).mockResolvedValue(
                { id: 1 } as any,
            );

            await faceitImportService.processNewStageMatches(
                [faceitMatch] as any,
                1,
            );

            expect(tournamentRepository.upsertGroupByName).toHaveBeenCalledWith(
                1,
                "Group A",
            );
        });

        it("should catch and log errors during match processing without failing entire batch", async () => {
            vi.mocked(tournamentRepository.findStageById).mockResolvedValue({
                id: 1,
            } as any);
            vi.mocked(matchRepository.findAllByStageId).mockResolvedValue([]);
            vi.mocked(
                teamRepository.findStageTeamByFaceitId,
            ).mockImplementation(() => {
                throw new Error("DB Error");
            });

            const match = createMockFaceitMatch();
            const result = await faceitImportService.processNewStageMatches(
                [match] as any,
                1,
            );

            expect(result.newMatchesCount).toBe(0);
            expect(logger.error).toHaveBeenCalledWith(
                expect.stringContaining("Error importing match"),
                expect.any(Error),
            );
        });
    });
});
