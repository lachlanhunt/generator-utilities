import { iterate, safeIterate } from "../base-iterators/";
import type { AnyIterable, Predicate } from "../base-iterators/types";
import { identity } from "../utils";

/**
 *
 * @param it Any iterable object
 * @param predicate
 */
export function* dropWhile<T>(it: AnyIterable<T, void, void>, predicate: Predicate<T> = identity) {
    const source = iterate(it);
    let cleanup = true;
    try {
        for (const value of safeIterate(source)) {
            // Safely iterate to prevent for..of from finishing the iterator
            if (!predicate(value)) {
                yield value;
                break;
            }
        }
        cleanup = false; // Going to yield next value, no early return
    } finally {
        // If this iterator returned early, call return on the wrapped iterator
        if (cleanup) {
            source.return();
        }
    }
    yield* source;
}
