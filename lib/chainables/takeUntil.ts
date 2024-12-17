import { iterate } from "../base-iterators/";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";

/**
 *
 * @param it Any iterable object
 * @param predicate
 */
export function* takeUntil<T>(it: AnyIterable<T>, predicate: Predicate<T> = identity) {
    for (const value of iterate(it)) {
        yield value;
        if (predicate(value)) return;
    }
}
