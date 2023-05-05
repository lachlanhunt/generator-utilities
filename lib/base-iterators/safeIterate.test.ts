import { safeIterate } from "./safeIterate";
import { counter } from "../sequences/counter";

describe("Safely iterating objects", () => {
    it("should yield values from an array", () => {
        const arr = [10, 20, 30, 40, 50];
        const iterable = safeIterate(arr);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should invoke the [Symbol.iterator] method of an object", () => {
        const arr = [10, 20, 30, 40, 50];
        const obj = {
            *[Symbol.iterator]() {
                yield* arr;
            },
        };

        const iterable = safeIterate(obj);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should not finish the wrapped iterator when it returns", () => {
        const c = counter();
        const iterable = safeIterate(c);

        iterable.return();

        expect(iterable.next()).toEqual({ value: undefined, done: true });
        expect(c.next()).toEqual({ value: 0, done: false });
    });
});
