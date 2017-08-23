const { safeIterate, counter } = require("../../index");

describe("Safely iterating objects", () => {
    it("should yield values from an array", () => {
        let arr = [10, 20, 30, 40, 50];
        let iterable = safeIterate(arr);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should invoke the [Symbol.iterator] method of an object", () => {
        let arr = [10, 20, 30, 40, 50];
        let obj = {
            *[Symbol.iterator]() {
                yield* arr;
            }
        };

        let iterable = safeIterate(obj);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should not finish the wrapped iterator when it returns", () => {
        let c = counter();
        let iterable = safeIterate(c);

        for (let value of iterable) {
            if (value > 3) break;
        }
        expect(iterable.next().done).toBe(true);
        expect(c.next().done).toBe(false);
    });
});
