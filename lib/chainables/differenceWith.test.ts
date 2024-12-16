import { differenceWith } from "./differenceWith";

describe("differenceWith generator", () => {
    it("should exclude values compared by converting to numbers", () => {
        let iterator = differenceWith([0, 1, 2, 3, 4, 5], ["0", "2", "4"], (a, b) => a === +b);
        let result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });
});
