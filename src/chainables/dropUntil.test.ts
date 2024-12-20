import { dropUntil } from "./dropUntil";

describe("dropUntil generator", () => {
    it("should drop the first 3 values and yield the remaining", () => {
        const iterator = dropUntil([0, 1, 2, 3, 4, 5], (value) => value === 3);
        const result = [...iterator];
        expect(result).toEqual([3, 4, 5]);
    });
});
