import { pluck } from "./pluck";

describe("pluck generator", () => {
    it("should yeild the value obtained by accessing the specified property on each object", () => {
        const iterator = pluck([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], "a");
        const result = [...iterator];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });
});
