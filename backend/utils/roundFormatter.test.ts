import { describe, expect, it } from "vitest";
import { formatSingleEliminationRoundAbbrev } from "./roundFormatter";

describe("formatSingleEliminationRoundAbbrev", () => {
    it("labels bronze match as 3RD", () => {
        expect(formatSingleEliminationRoundAbbrev(4, 16, true)).toBe("3RD");
    });

    it("maps depth to GF SF QF RO16 for 16 teams", () => {
        expect(formatSingleEliminationRoundAbbrev(4, 16, false)).toBe("GF");
        expect(formatSingleEliminationRoundAbbrev(3, 16, false)).toBe("SF");
        expect(formatSingleEliminationRoundAbbrev(2, 16, false)).toBe("QF");
        expect(formatSingleEliminationRoundAbbrev(1, 16, false)).toBe("RO16");
    });

    it("uses RO32 for larger early rounds", () => {
        expect(formatSingleEliminationRoundAbbrev(1, 32, false)).toBe("RO32");
    });
});
