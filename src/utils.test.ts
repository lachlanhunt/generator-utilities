import { identity, isEqual, randomInt, randomFloat, swap, toLength } from "./utils";

describe("Utility functions", () => {
    describe("identity", () => {
        it("returns the same value", () => {
            expect(identity(1)).toBe(1);
            expect(identity("a")).toBe("a");
            expect(identity({})).toEqual({});
            expect(identity([])).toEqual([]);
        });
    });

    describe("isEqual", () => {
        it("should return true if the values are equal", () => {
            expect(isEqual("a", "a")).toBe(true);
            expect(isEqual(1, 1)).toBe(true);
            expect(isEqual(123n, 123n)).toBe(true);
            expect(isEqual(true, true)).toBe(true);
            expect(isEqual(false, false)).toBe(true);
            expect(isEqual(undefined, undefined)).toBe(true);
            expect(isEqual(null, null)).toBe(true);

            const sym = Symbol();
            const obj = { a: 1 };
            const arr = [1, 2, 3];

            expect(isEqual(obj, obj)).toBe(true);
            expect(isEqual(arr, arr)).toBe(true);
            expect(isEqual(sym, sym)).toBe(true);
        });

        it("should return false if the values are not equal", () => {
            expect(isEqual("a", "b")).toBe(false);
            expect(isEqual(1, 2)).toBe(false);
            expect(isEqual(123n, 321n)).toBe(false);
            expect(isEqual(true, false)).toBe(false);
            expect(isEqual(null, undefined)).toBe(false);

            expect(isEqual({ a: 1 }, { a: 1 })).toBe(false);
            expect(isEqual([1], [1])).toBe(false);
            expect(isEqual(Symbol(), Symbol())).toBe(false);

            expect(isEqual<number | string>(1, "1")).toBe(false);
        });
    });

    describe("randomInt", () => {
        it("should return a random integer", () => {
            const min = 1;
            const max = 10;

            const result = randomInt(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
            expect(Number.isInteger(result)).toBe(true);
        });
    });

    describe("randomFloat", () => {
        it("should return a random float", () => {
            const min = 1;
            const max = 10;

            const result = randomFloat(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
            expect(Number.isFinite(result)).toBe(true);
        });
    });

    describe("swap", () => {
        it("should swap the values at the given indices", () => {
            const arr = [1, 2, 3];

            swap(arr, 0, 2);

            expect(arr).toEqual([3, 2, 1]);
        });

        it("should not swap the values if the indices are the same", () => {
            const arr = [1, 2, 3];

            swap(arr, 0, 0);

            expect(arr).toEqual([1, 2, 3]);
        });

        it("should not swap the values if the indices are out of bounds", () => {
            const arr = [1, 2, 3];

            swap(arr, 0, 3);

            expect(arr).toEqual([1, 2, 3]);
        });
    });

    describe("toLength", () => {
        it("should return 0 if the value is less than 0", () => {
            expect(toLength(-1)).toBe(0);
            expect(toLength(Number.MIN_SAFE_INTEGER)).toBe(0);
        });

        it("should return the value if it is an integer", () => {
            expect(toLength(0)).toBe(0);
            expect(toLength(1)).toBe(1);
            expect(toLength(123)).toBe(123);
        });

        it("should return the value if it is a safe integer", () => {
            expect(toLength(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
        });

        it("should return the maximum safe integer if the value is greater than the maximum safe integer", () => {
            expect(toLength(Number.MAX_SAFE_INTEGER + 1)).toBe(Number.MAX_SAFE_INTEGER);
            expect(toLength(Number.MAX_VALUE)).toBe(Number.MAX_SAFE_INTEGER);
            expect(toLength(Infinity)).toBe(Number.MAX_SAFE_INTEGER);
        });

        it("should return the rounded integer value if it is a float", () => {
            expect(toLength(1.1)).toBe(1);
            expect(toLength(123.456)).toBe(123);
        });
    });
});
