import { series } from "./series";
import { takeUntil } from "../chainables/index";

/**
 * [collatz description]
 *
 * @generator
 * @param  {Number}    n [description]
 * @yields {Number}   [description]
 */
export function* collatz(n) {
    if (n < 1 || n % 1) return;

    const f = (n) => (n % 2 ? n * 3 + 1 : n / 2);
    const s = series(f, n);
    const predicate = (n) => n === 1;
    yield* takeUntil(s, predicate);
}
