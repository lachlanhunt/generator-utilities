const { iterate, counter } = require("../../index");

describe("Iterating objects", () => {
    it("should yield values from an array", () => {
        let arr = [10, 20, 30, 40, 50];
        let iterable = iterate(arr);

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

        let iterable = iterate(obj);

        for (let i = 0; i <= arr.length; i++) {
            expect(iterable.next().value).toBe(arr[i]);
        }
    });

    it("should finish the wrapped iterator when it returns", () => {
        let c = counter();
        let iterable = iterate(c);

        for (let value of iterable) {
            if (value > 3) break;
        }
        expect(iterable.next().done).toBe(true);
        expect(c.next().done).toBe(true);
    });

    it("should work with array-like objects", () => {
        let obj = {
            length: 5,
            "0": 10,
            "1": 20,
            "2": 30,
            "3": 40,
            "4": 50
        };

        let iterable = iterate(obj);

        for (let i = 0; i < obj.length; i++) {
            expect(iterable.next().value).toBe(obj[i]);
        }
    });
});
