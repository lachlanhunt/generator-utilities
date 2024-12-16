import { iterate } from "../base-iterators/";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param fn
 */
export function* forEach(it, fn = identity) {
    let index = 0;
    for (const value of iterate(it)) {
        fn(value, index++);
        yield value;
    }
}
