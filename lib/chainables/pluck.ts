import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param it Any iterable object
 * @param prop
 */
export function* pluck<T>(it: AnyIterable<T>, prop: keyof T) {
    for (const value of iterate(it)) {
        yield value !== null && value !== undefined ? value[prop] : undefined;
    }
}
