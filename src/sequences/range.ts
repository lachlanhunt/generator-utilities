import type { Predicate } from "../base-iterators/types";
import { takeWhile } from "../chainables";
import { counter } from "./counter";

/**
 * Generate a range of numbers progressing from `start` up to, but not including, `end`.
 * If only one parameter is given, `start` is set to 0 and `end` is set to the value provided.
 * If end is less than start, then the default step is -1;
 *
 * @generator
 * @param [start=0] The value to start the range from
 * @param end The end of the range (excluded)
 * @param [step=1] The value to increment or decrement by.
 * @yields numbers in the sequence
 */
export function* range(
    start = 0,
    end = (() => {
        const end = start;
        start = 0;
        return end;
    })(),
    step = (() => (start < end ? 1 : -1))(),
) {
    const count = counter(start, step);

    const predicate: Predicate<number> = Math.sign(step) < 0 ? (v) => v > end : (v) => v < end;

    yield* takeWhile(count, predicate);
}
