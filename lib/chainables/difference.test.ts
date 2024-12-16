import { difference } from "./difference";

describe("difference generator", () => {
    it("should exclude values in an array", () => {
        const iterator = difference([0, 1, 2, 3, 4, 5], [0, 2, 4]);
        const result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });

    it("should exclude values passed as parameters", () => {
        const iterator = difference([0, 1, 2, 3, 4, 5], 0, 2, 4);
        const result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });
});
