import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { isEqual } from "../utils";

/**
 *
 * @param it Any iterable object
 * @param values
 * @param comparator
 */
export function* differenceWith<T, U>(
    it: AnyIterable<T>,
    values: AnyIterable<U>,
    comparator: (a: T | U, b: T | U) => boolean = isEqual,
) {
    const source = iterate(it);
    const exclusions = Array.from(values);

    for (const value of source) {
        if (!exclusions.some((otherValue) => comparator(value, otherValue))) {
            yield value;
        }
    }
}
