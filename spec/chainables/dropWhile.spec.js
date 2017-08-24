const { dropWhile } = require("../../");

describe("dropWhile generator", () => {
    it("should drop the first 3 values and yield the remaining", () => {
        let iterator = dropWhile([0, 1, 2, 3, 4, 5], value => value !== 3);
        let result = [...iterator];
        expect(result).toEqual([3, 4, 5]);
    });
});
