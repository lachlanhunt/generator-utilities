import { takeWhile } from "./takeWhile";

describe("takeWhile generator", () => {
    it("should only take items while the values are less than 6", () => {
        const iterator = takeWhile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n < 6);
        const result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });
});
