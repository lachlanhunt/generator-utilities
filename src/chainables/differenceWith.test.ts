import { differenceWith } from "./differenceWith";

describe("differenceWith generator", () => {
    it("should exclude values compared by converting to numbers", () => {
        const iterator = differenceWith([0, 1, 2, 3, 4, 5], ["0", "2", "4"], (a, b) => a === +b);
        const result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });

    it("should exclude values compared with a comparator function", () => {
        const iterator = differenceWith(["0", "1", "2", "3", "4", "5"], [0, 2, 4], (a, b) => a === `${b}`);
        const result = [...iterator];
        expect(result).toEqual(["1", "3", "5"]);
    });
});
