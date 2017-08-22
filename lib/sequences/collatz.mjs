import series from "./series";
import { takeUntil } from "../chainables/index";

/**
 * [collatz description]
 *
 * @generator
 * @param  {Number}    n [description]
 * @yields {Number}   [description]
 */
export default function* collatz(n) {
    if (n < 1 || n % 1) return;

    let f = n => (n % 2 ? n * 3 + 1 : n / 2);
    let s = series(f, n);
    let predicate = n => n === 1;
    yield* takeUntil(s, predicate);
}
