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

    it("should not finish the wrapped iterator when it throws", () => {
        const c = counter();
        const iterable = safeIterate(c);

        expect(() => iterable.throw(new Error("test"))).toThrow("test");

        expect(iterable.next()).toEqual({ value: undefined, done: true });
        expect(c.next()).toEqual({ value: 0, done: false });
    });

    it("should support iterating array-like objects", () => {
        const obj: ArrayLike<number> = { length: 5, 0: 10, 1: 20, 2: 30, 3: 40, 4: 50 };
        const iterable = safeIterate(obj);

        for (let i = 0; i <= obj.length; i++) {
            expect(iterable.next().value).toBe(obj[i]);
        }
    });
});
