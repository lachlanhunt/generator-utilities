import { unzip } from "./unzip";

describe("unzip generator", () => {
    it("should take an array of arrays and regroup items in their pre-zip configuration", () => {
        const iterator = unzip([
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [5, 10],
        ]);
        const result = [...iterator];
        expect(result).toEqual([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
        ]);
    });
});
