const { modulo } = require("../../");

describe("modulo generator", () => {
    it("should yeild the the value (mod 3) using Euclidian division (always positive)", () => {
        let iterator = modulo([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 3);
        let result = [...iterator];
        expect(result).toEqual([1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]);
    });

    it("should yeild the the value (mod -3) using Euclidian division (always positive)", () => {
        let iterator = modulo([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], -3);
        let result = [...iterator];
        expect(result).toEqual([1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]);
    });
});
