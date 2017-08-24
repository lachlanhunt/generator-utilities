const { concat } = require("../../");

describe("concat generator", () => {
    it("should yield values from multiple sources", () => {
        let iterator = concat([0, 1], 2, [3, 4, 5]);
        let result = [...iterator];
        expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });
});
