const { everyNth } = require("../../");

describe("everyNth generator", () => {
    it("should yield every 3rd value", () => {
        let iterator = everyNth([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
        let result = [...iterator];
        expect(result).toEqual([2, 5, 8]);
    });

    it("should yield every 3rd value beginning with the first", () => {
        let iterator = everyNth([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, true);
        let result = [...iterator];
        expect(result).toEqual([0, 3, 6, 9]);
    });
});
