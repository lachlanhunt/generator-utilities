const { interlace } = require("../../");

describe("interlace generator", () => {
    it("should alternately yield values from each array", () => {
        let iterator = interlace([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
        let result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});
