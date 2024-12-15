import { iterate } from "../base-iterators/index";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param fn
 */
export function* forEach(it, fn = identity) {
    let index = 0;
    for (let value of iterate(it)) {
        fn(value, index++);
        yield value;
    }
}
