import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { isEqual } from "../utils";

const UNDEFINED = Symbol("undefined");

/**
 *
 * @param it Any iterable object
 * @param comparator
 */
export function* dedupe<T, TReturn>(it: AnyIterable<T, TReturn, void>, comparator: (a: T, b: T) => boolean = isEqual) {
    const source = iterate(it);
    let prev: T | typeof UNDEFINED = UNDEFINED;

    for (const value of source) {
        if (prev === UNDEFINED || !comparator(value, prev)) {
            prev = value;
            yield value;
        }
    }
}
