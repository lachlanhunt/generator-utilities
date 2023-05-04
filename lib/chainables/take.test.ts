import { take } from "./take";
import { counter } from "../sequences/counter";
describe("take generator", () => {
    it("should only take the first 5 items", () => {
        const iterator = take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
        const result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should take the first 5 items from an infinite iterator", () => {
        const iterator = take(counter(), 5);
        const result = [...iterator];
        expect(result).toEqual([0, 1, 2, 3, 4]);
    });
});
