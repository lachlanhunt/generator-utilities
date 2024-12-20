import { series } from "../sequences/series";
import { takeUntil } from "../chainables/";

/**
 * [collatz description]
 *
 * @generator
 * @param  {Number}    n [description]
 * @yields {Number}   [description]
 */
export function* collatz(n: number) {
    if (n < 1 || n % 1) return;

    const f = (n: number) => (n % 2 ? n * 3 + 1 : n / 2);
    const s = series(f, n);
    const predicate = (n: number) => n === 1;
    yield* takeUntil(s, predicate);
}
