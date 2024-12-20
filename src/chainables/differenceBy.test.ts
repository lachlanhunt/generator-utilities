import { differenceBy } from "./differenceBy";

describe("differenceBy generator", () => {
    it("should exclude values compared by converting to numbers", () => {
        const iterator = differenceBy([0, 1, 2, 3, 4, 5], ["0", "2", "4"], Number);
        const result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });
});
