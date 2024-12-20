import { filter } from "./filter";

describe("filter generator", () => {
    it("should yield multiples of 3", () => {
        const iterator = filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => !(n % 3));
        const result = [...iterator];
        expect(result).toEqual([0, 3, 6, 9]);
    });
});
