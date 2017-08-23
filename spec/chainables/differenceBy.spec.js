const { differenceBy } = require("../../");

describe("differenceBy generator", () => {
    it("should exclude values compared by converting to numbers", () => {
        let iterator = differenceBy(
            [0, 1, 2, 3, 4, 5],
            ["0", "2", "4"],
            Number
        );
        let result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });
});
