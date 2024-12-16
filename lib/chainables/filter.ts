import { iterate } from "../base-iterators/index";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
export function* filter<T>(it: AnyIterable<T, void, void>, predicate: Predicate<T> = identity) {
    let i = 0;
    for (const value of iterate(it)) {
        if (predicate(value, i++)) {
            yield value;
        }
    }
}
