import { iterate } from "../base-iterators/";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";

/**
 *
 * @param it Any iterable object
 * @param predicate
 */
export function* filter<T>(it: AnyIterable<T, void, void>, predicate: Predicate<T> = identity) {
    for (const value of iterate(it)) {
        if (predicate(value)) {
            yield value;
        }
    }
}
