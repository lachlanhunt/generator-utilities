const { difference } = require("../../");

describe("difference generator", () => {
    it("should exclude values in an array", () => {
        let iterator = difference([0, 1, 2, 3, 4, 5], [0, 2, 4]);
        let result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });

    it("should exclude values passed as parameters", () => {
        let iterator = difference([0, 1, 2, 3, 4, 5], 0, 2, 4);
        let result = [...iterator];
        expect(result).toEqual([1, 3, 5]);
    });
});
