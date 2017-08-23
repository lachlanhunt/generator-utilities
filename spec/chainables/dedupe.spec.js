const { dedupe } = require("../../");

describe("dedupe generator", () => {
    it("should ", () => {
        let iterator = dedupe([1, 2, 2, 3, 3, 3]);
        let result = [...iterator];
        expect(result).toEqual([1, 2, 3]);
    });
});
