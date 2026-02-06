import { describe, it, expect, vi } from "vitest";
import { transformFaceitTournament } from "./transformFaceitData";

// Mock the tournamentRepository to avoid DB calls
vi.mock("../modules/tournaments/tournament.repository", () => ({
    tournamentRepository: {
        findFormatByName: vi.fn().mockResolvedValue({ id: 1 }),
    },
}));

describe("transformFaceitData", () => {
    describe("transformFaceitTournament", () => {
        it("should correctly transform Faceit championship data", async () => {
            const mockFaceitChampionship = {
                id: "faceit-id-123",
                name: "Test Tournament",
                type: "swiss",
                status: "finished",
                game_id: "csgo",
                region: "EU",
                championship_start: 1672531200000, // 2023-01-01
                championship_end: 1672617600000,
                subscription_end: 1672444800000,
                slots: 16,
                total_groups: 1,
                faceit_url: "https://faceit.com/en/championships/123",
            };

            const tournamentId = 1;
            const result = await transformFaceitTournament(
                mockFaceitChampionship,
                tournamentId,
            );

            expect(result).toEqual({
                tournament_id: 1,
                name: "Test Tournament",
                faceit_id: "faceit-id-123",
                max_teams: 16,
                format_id: 1,
                start_date: new Date(1672531200000),
                end_date: null,
                registration_deadline: new Date(1672444800000),
            });
        });

        it("should handle missing optional dates", async () => {
            const mockFaceitChampionship = {
                id: "faceit-id-456",
                name: "Minimal Tournament",
                type: "single_elimination",
                status: "created",
                game_id: "csgo",
                region: "EU",
                championship_start: 0,
                championship_end: 0,
                subscription_end: 0,
                slots: 8,
                total_groups: 1,
                faceit_url: "",
            };

            const result = await transformFaceitTournament(
                mockFaceitChampionship,
                2,
            );

            expect(result.start_date).toBeNull();
            expect(result.registration_deadline).toBeNull();
        });
    });
});
