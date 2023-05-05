import { counter } from "../sequences/counter";
import { identity } from "../utils";
import map from "./map";

describe("map generator", () => {
    it("should yield values mapped by the given mapping function", () => {
        const iterator = map([1, 2, 3], (n) => -n);
        const result = [...iterator];
        expect(result).toEqual([-1, -2, -3]);
    });

    it("should yield values mapped by the given mapping function from an infinite iterator", () => {
        const iterator = map(counter(), (n) => -n);

        for (let i = 0; i < 5; i++) {
            expect(iterator.next()).toEqual({ value: -i, done: false });
        }
    });

    it("should yield values mapped by the given mapping function from an infinite iterator with a next input", () => {
        function* progressiveSum(): Generator<number, void, number> {
            let sum = 0;

            for (let i = 0; i < 5; i++) {
                sum += yield sum;
            }
        }

        const iterable = map(progressiveSum(), (n) => `${-n}`);
        expect(iterable.next()).toEqual({ value: "0", done: false });
        expect(iterable.next(10)).toEqual({ value: "-10", done: false });
        expect(iterable.next(20)).toEqual({ value: "-30", done: false });
    });

    it("should finish when the wrapped generator finishes", () => {
        function* gen() {
            yield 1;
            yield 2;
            return 3;
        }
        const iterable = map(gen(), (n) => n);
        const result = [...iterable];
        expect(result).toEqual([1, 2]);
    });

    it("should finish the wrapped iterate when return() is invoked", () => {
        const c = counter();
        const iterable = map(c, (n) => n);
        iterable.next();
        iterable.return();
        expect(c.next()).toEqual({ value: undefined, done: true });
    });

    it("should support mapping from array-like objects", () => {
        const iterable = map({ length: 5, 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f" }, (n) => n);
        const result = [...iterable];
        expect(result).toEqual(["a", "b", "c", "d", "e"]);
    });

    it("should support taking from empty iterables", () => {
        const iterable = map([], identity);
        const result = [...iterable];
        expect(result).toEqual([]);
    });
});
