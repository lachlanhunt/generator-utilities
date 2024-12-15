import { iterate } from "../base-iterators/index";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
export function* filter(it, predicate = identity) {
    let i = 0;
    for (let value of iterate(it)) {
        if (predicate(value, i++)) {
            yield value;
        }
    }
}
