import { iterate } from "../base-iterators/";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";
/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 * @returns {*}
 */
export function* takeWhile<T>(it: AnyIterable<T, void, void>, predicate: Predicate<T> = identity) {
    for (const value of iterate(it)) {
        if (!predicate(value)) return;
        yield value;
    }
}
