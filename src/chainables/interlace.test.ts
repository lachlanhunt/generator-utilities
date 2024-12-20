import { interlace } from "./interlace";

describe("interlace generator", () => {
    it("should alternately yield values from each array", () => {
        const iterator = interlace([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]);
        const result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});
