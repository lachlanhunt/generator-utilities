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

    it("should exclude values in an array-like object", () => {
        const iterator = difference("abcdef", [..."ace"]);
        const result = [...iterator];
        expect(result).toEqual(["b", "d", "f"]);
    });

    it("should exclude items from multiple sources", () => {
        const iterator = difference([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4], [6, 8, 10]);
        const result = [...iterator];
        expect(result).toEqual([1, 3, 5, 7, 9]);
    });
});
