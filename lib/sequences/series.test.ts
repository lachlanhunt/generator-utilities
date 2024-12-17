const { series, take } = require("./");

describe("Series sequence", () => {
    it("should generate the fibonacci sequence", () => {
        const iterator = series((a, b) => a + b, 1, 1);
        const result = [...take(iterator, 10)];
        expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
});
