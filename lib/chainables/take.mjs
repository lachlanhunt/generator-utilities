import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
export default function* take(it, n = 1) {
    let count = 0;
    if (n <= 0) return;

    for (let value of iterate(it)) {
        yield value;
        if (++count >= n) return;
    }
}
