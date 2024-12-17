import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";
import { flatten } from "./flatten";

/**
 * Exclude any items from the given Iterable that are also present in the provided values. Any Iterable
 * passed to the values parameter must yield a finite sequence to avoid an infinite loop.
 *
 * @param it Any iterable object
 * @param values One or more arrays or finitely iterable objects containing the set of values
 *         to be excluded by the generator.
 */
export function* difference<T>(it: AnyIterable<T>, ...values: (AnyIterable<T> | T)[]) {
    const source = iterate(it);
    const exclusions = new Set([...flatten(values, 1)]);

    for (const value of source) {
        if (!exclusions.has(value)) {
            yield value;
        }
    }
}
