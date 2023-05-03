import { reverse } from "./reverse";

describe("Reverse iterating objects", () => {
    it("should yield values from an array in reverse", () => {
        const arr = [10, 20, 30, 40, 50];
        const iterable = reverse(arr);

        for (let i = arr.length - 1; i >= 0; i--) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should work with array-like objects", () => {
        const obj: ArrayLike<number> = {
            length: 5,
            "0": 10,
            "1": 20,
            "2": 30,
            "3": 40,
            "4": 50,
        };

        const iterable = reverse(obj);

        for (let i = obj.length - 1; i >= 0; i--) {
            expect(iterable.next().value).toBe(obj[i]);
        }
    });

    it("should not iterate any object without a length", () => {
        const obj: Partial<ArrayLike<number>> = {
            "0": 10,
            "1": 20,
            "2": 30,
            "3": 40,
            "4": 50,
        };

        const result = [...reverse(obj as ArrayLike<number>)];
        expect(result).toEqual([]);
    });
});
