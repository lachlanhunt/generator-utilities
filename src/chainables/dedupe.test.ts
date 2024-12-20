import { dedupe } from "./dedupe";

describe("dedupe generator", () => {
    it("should remove sequential duplicate values", () => {
        const iterator = dedupe([1, 2, 2, 3, 3, 3]);
        const result = [...iterator];
        expect(result).toEqual([1, 2, 3]);
    });

    it("should remove duplicate values based on comparator", () => {
        const iterator = dedupe(
            [{ value: 1 }, { value: 2 }, { value: 2 }, { value: 3 }, { value: 3 }, { value: 3 }],
            (a, b) => a.value === b.value,
        );
        const result = [...iterator];
        expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });
});
