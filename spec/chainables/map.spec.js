const { map } = require("../../");

describe("map generator", () => {
    it("should yield values mapped by the given mapping function", () => {
        let iterator = map([1, 2, 3], n => -n);
        let result = [...iterator];
        expect(result).toEqual([-1, -2, -3]);
    });
});
