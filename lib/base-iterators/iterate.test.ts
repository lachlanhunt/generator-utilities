import { iterate } from "./iterate";

describe("Iterating objects", () => {
    it("should yield values from an array", () => {
        const arr = [10, 20, 30, 40, 50];
        const iterable = iterate(arr);

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

        const iterable = iterate(obj);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    /* TODO Uncomment this test after the counter generator has been converted to TypeScript
    it("should finish the wrapped iterator when it returns", () => {
        let c = counter();
        let iterable = iterate(c);

        for (let value of iterable) {
            if (value > 3) break;
        }
        expect(iterable.next().done).toBe(true);
        expect(c.next().done).toBe(true);
    });
    */

    it("should work with array-like objects", () => {
        const obj: ArrayLike<number> = {
            length: 5,
            0: 10,
            1: 20,
            2: 30,
            3: 40,
            4: 50,
        };

        const iterable = iterate(obj);

        for (let i = 0; i < obj.length; i++) {
            expect(iterable.next().value).toBe(obj[i]);
        }
    });
});
