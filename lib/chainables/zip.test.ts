import { zip } from "./zip";

describe("zip generator", () => {
    it("should group items from two arrays according to their index in the source arrays", () => {
        const iterator = zip([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);
        const result = [...iterator];
        expect(result).toEqual([
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ]);
    });
});
