const { take } = require("../../");

describe("take generator", () => {
    it("should only take the first 5 items", () => {
        let iterator = take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
        let result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });
});
