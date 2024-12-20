import { iterate, safeIterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { take } from "./take";

/**
 *
 * @param it Any iterable object
 * @param n
 */
export function* drop<T>(it: AnyIterable<T>, n = 1) {
    const source = iterate(it);
    void [...take(safeIterate(source), n)]; // Safely iterate to prevent take() from finishing the iterator
    yield* source;
}
