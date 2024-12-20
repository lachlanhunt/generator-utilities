import { flatten } from "./flatten";

describe("flatten generator", () => {
    it("should flatten nested arrays", () => {
        const iterator = flatten([[0, 1, 2], 3, [4, 5, 6, [7, 8, 9]]]);
        const result = [...iterator];
        expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
