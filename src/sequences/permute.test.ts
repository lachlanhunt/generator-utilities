import { permute } from "./permute";

describe("Permute sequence", () => {
    it("should ", () => {
        const iterator = permute([1, 2, 3]);
        const result = [...iterator];
        expect(result).toEqual([
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
        ]);
    });
});
