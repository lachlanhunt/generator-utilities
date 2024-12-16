import { compact } from "./compact";

describe("compact generator", () => {
    it("should exclude falsey values", () => {
        const iterator = compact([0, null, 1, false, undefined, 2, NaN, "", 3]);
        const result = [...iterator];

        expect(result).toEqual([1, 2, 3]);
    });
});
