import { permute } from "./permute";

describe("Permute sequence", () => {
    it("should ", () => {
        let iterator = permute([1, 2, 3]);
        let result = [...iterator];
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
