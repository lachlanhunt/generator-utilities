import type { AnyIterable } from "../base-iterators/types";
import { identity } from "../utils";
import { filter } from "./filter";

/**
 * Takes values from the supplied Iterable and yields only truthy values. The falsey values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` will be excluded.
 *
 * @param it Any iterable object
 */
export function* compact<T, TReturn, TNext>(it: AnyIterable<T, TReturn, TNext>) {
    yield* filter(it, identity);
}
