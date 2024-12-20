import { take } from "../chainables";
import { series } from "./series";

describe("Series sequence", () => {
    it("should generate the fibonacci sequence", () => {
        const iterator = series((a: number, b: number) => a + b, 0, 1);
        const result = [...take(iterator, 10)];
        expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it("should generate the lucas sequence", () => {
        const iterator = series((a: number, b: number) => a + b, 2, 1);
        const result = [...take(iterator, 10)];
        expect(result).toEqual([2, 1, 3, 4, 7, 11, 18, 29, 47, 76]);
    });

    it("should generate the pell sequence", () => {
        const iterator = series((a: number, b: number) => a + 2 * b, 0, 1);
        const result = [...take(iterator, 10)];
        expect(result).toEqual([0, 1, 2, 5, 12, 29, 70, 169, 408, 985]);
    });

    it("should generate the tribonacci sequence", () => {
        const iterator = series((a: number, b: number, c: number) => a + b + c, 0, 0, 1);
        const result = [...take(iterator, 10)];
        expect(result).toEqual([0, 0, 1, 1, 2, 4, 7, 13, 24, 44]);
    });
});
