import { describe, expect, it } from "vitest";
import { isThirdPlaceSingleElim } from "./team.utils";

describe("isThirdPlaceSingleElim", () => {
    it("returns false when both teams have no stage losses yet (e.g. grand final)", () => {
        expect(isThirdPlaceSingleElim(0, 0)).toBe(false);
    });

    it("returns true when either team already has a stage loss (3rd-place match)", () => {
        expect(isThirdPlaceSingleElim(1, 0)).toBe(true);
        expect(isThirdPlaceSingleElim(0, 1)).toBe(true);
        expect(isThirdPlaceSingleElim(1, 1)).toBe(true);
    });
});
