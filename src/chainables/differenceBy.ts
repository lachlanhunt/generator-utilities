import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { identity } from "../utils";

/**
 * Exclude any items from the given Iterable that are also present in the provided values, where each value
 * is mapped using the supplied map function prior to comparing. Any Iterable passed to the values parameter
 * must yield a finite sequence to avoid an infinite loop.
 *
 * @param it Any iterable object
 * @param values An array or finitely iterable object containing the set of values
 *        to be excluded by the generator.
 * @param mapFn
 */
export function* differenceBy<T, U>(
    it: AnyIterable<T>,
    values: AnyIterable<U>,
    mapFn: (value: T | U) => unknown = identity,
) {
    const source = iterate(it);
    const exclusions = new Set(Array.from(values, mapFn));

    for (const value of source) {
        if (!exclusions.has(mapFn(value))) {
            yield value;
        }
    }
}
