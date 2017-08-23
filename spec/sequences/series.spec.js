const { series } = require("../../");

describe("Series sequence", () => {
    it("should generate the fibonacci sequence", () => {
        let iterator = series((a, b) => a + b, 1, 1);
        let result = [...iterator.take(10)];
        expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
});
