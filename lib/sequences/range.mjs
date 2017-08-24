import { takeWhile } from "../chainables/index";
import counter from "./counter";

/**
 * Generate a range of numbers progressing from `start` up to, but not including, `end`.
 * If only one parameter is given, `start` is set to 0 and `end` is set to the value provided.
 * If end is less than start, then the default step is -1;
 *
 * @generator
 * @param {number} [start=0] The value to start the range from
 * @param {number} end The end of the range (excluded)
 * @param {number} [step=1] The value to increment or decrement by.
 * @yields numbers in the sequence
 */
export default function* range(
    start = 0,
    end = (() => {
        let end = start;
        start = 0;
        return end;
    })(),
    step = (() => (start < end ? 1 : -1))()
) {
    let count = counter(start, step);

    let predicate = Math.sign(step) < 0 ? v => v > end : v => v < end;

    yield* takeWhile(count, predicate);
}
