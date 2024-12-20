import { concat } from "./concat";

describe("concat generator", () => {
    it("should yield values from multiple sources", () => {
        const iterator = concat([0, 1], 2, [3, 4, 5]);
        const result = [...iterator];
        expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it("should yield from ArrayLike objects", () => {
        const iterator = concat<number | string>({ length: 3, 0: 0, 1: 1, 2: 2 }, "345");
        const result = [...iterator];
        expect(result).toEqual([0, 1, 2, "3", "4", "5"]);
    });
});
