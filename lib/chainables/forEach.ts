import { iterate } from "../base-iterators/";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";

/**
 *
 * @param it Any iterable object
 * @param fn
 */
export function* forEach<T>(it: AnyIterable<T>, fn: Predicate<T> = identity) {
    for (const value of iterate(it)) {
        fn(value);
        yield value;
    }
}
