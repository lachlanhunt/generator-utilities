import { take } from "../chainables";
import { repeat } from "./repeat";

describe("Repeat sequence", () => {
    function* test(a = 1, b = 2, c = 3) {
        yield* [a, b, c];
    }

    const generatorFn = vi.fn(test);

    beforeEach(() => {
        generatorFn.mockRestore();
    });

    it("should repeatedly yield all values of an array", () => {
        expect([...take(repeat([1, 2, 3]), 7)]).toEqual([1, 2, 3, 1, 2, 3, 1]);
    });

    it("should invoke the supplied generator function on each repetition", () => {
        const result = [...take(repeat(generatorFn), 7)];

        expect(result).toEqual([1, 2, 3, 1, 2, 3, 1]);
        expect(generatorFn).toHaveBeenCalledTimes(3);
    });

    it("should invoke the supplied generator function with the given arguments on each repetition", () => {
        const result = [...take(repeat(generatorFn, 3, 2, 1), 7)];

        expect(result).toEqual([3, 2, 1, 3, 2, 1, 3]);
        expect(generatorFn).toHaveBeenCalledTimes(3);
        expect(generatorFn).toHaveBeenCalledWith(3, 2, 1);
    });

    it("should handle empty iterators", () => {
        const result = [...repeat([])];

        expect(result).toEqual([]);
    });
});
