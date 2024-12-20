import { range } from "./range";

describe("Range sequence", () => {
    it("should generate an empty if no parameters are given", () => {
        expect([...range()]).toEqual([]);
    });

    it("should generate a range from 0 to 9", () => {
        expect([...range(10)]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should generate a range from 1 to 10", () => {
        expect([...range(1, 11)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("should count down if a single negative value is given", () => {
        expect([...range(-9)]).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8]);
    });

    it("should increment by 2", () => {
        expect([...range(0, 11, 2)]).toEqual([0, 2, 4, 6, 8, 10]);
    });
});
