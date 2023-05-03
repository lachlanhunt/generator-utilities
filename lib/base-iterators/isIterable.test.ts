import { isIterable } from "./isIterable";

describe("isIterable", () => {
    it("should return true if an object is iterable", () => {
        expect(isIterable([1, 2, 3])).toBe(true);
        expect(isIterable(new Set([1, 2, 3]))).toBe(true);
        expect(
            isIterable(
                new Map([
                    [1, 2],
                    [3, 4],
                ])
            )
        ).toBe(true);
        expect(isIterable("abc")).toBe(true);
    });

    it("should return false if an object is not iterable", () => {
        expect(isIterable({ length: 0 })).toBe(false);
    });
});
