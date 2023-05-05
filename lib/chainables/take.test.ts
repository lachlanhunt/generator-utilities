import { take } from "./take";
import { counter } from "../sequences/counter";
describe("take generator", () => {
    it("should only take the first 5 items", () => {
        const iterable = take([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5);
        const result = [...iterable];
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should take the first 5 items from an infinite iterator", () => {
        const iterable = take(counter(), 5);
        const result = [...iterable];
        expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("should finish the wrapped iterate when it completes taking", () => {
        const c = counter();
        const iterable = take(c, 5);
        const result = [...iterable];
        expect(result).toEqual([0, 1, 2, 3, 4]);
        expect(c.next()).toEqual({ value: undefined, done: true });
    });

    it("should finish the wrapped iterate when return() is invoked", () => {
        const c = counter();
        const iterable = take(c, 5);
        iterable.next();
        iterable.return();
        expect(c.next()).toEqual({ value: undefined, done: true });
    });

    it("should return early when the wrapped generator returns", () => {
        function* gen() {
            yield 1;
            yield 2;
            return 3;
        }
        const iterable = take(gen(), 5);
        const result = [...iterable];
        expect(result).toEqual([1, 2]);
    });

    it("should support taking from array-like objects", () => {
        const iterable = take({ length: 5, 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f" }, 5);
        const result = [...iterable];
        expect(result).toEqual(["a", "b", "c", "d", "e"]);
    });

    it("should support taking from array-like objects with fewer items", () => {
        const iterable = take({ length: 3, 0: "a", 1: "b", 2: "c" }, 5);
        const result = [...iterable];
        expect(result).toEqual(["a", "b", "c"]);
    });

    it("should support taking from empty iterables", () => {
        const iterable = take([], 5);
        const result = [...iterable];
        expect(result).toEqual([]);
    });

    it("should support taking 0 items", () => {
        const iterable = take([1, 2, 3, 4, 5], 0);
        const result = [...iterable];
        expect(result).toEqual([]);
    });

    it("should support taking negative items", () => {
        const iterable = take([1, 2, 3, 4, 5], -1);
        const result = [...iterable];
        expect(result).toEqual([]);
    });

    it("should support passing values to the wrapped Generator via .next(value)", () => {
        function* progressiveSum(): Generator<number, void, number> {
            let sum = 0;

            for (let i = 0; i < 5; i++) {
                sum += yield sum;
            }
        }

        const iterable = take(progressiveSum(), 3);
        expect(iterable.next()).toEqual({ value: 0, done: false });
        expect(iterable.next(10)).toEqual({ value: 10, done: false });
        expect(iterable.next(10)).toEqual({ value: 20, done: false });
        expect(iterable.next(10)).toEqual({ value: undefined, done: true });
    });
});
