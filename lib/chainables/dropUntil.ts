import { iterate, safeIterate } from "../base-iterators/index";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
export function* dropUntil(it, predicate = identity) {
    let source = iterate(it);
    let cleanup = true;
    try {
        for (let value of safeIterate(source)) {
            // Safely iterate to prevent for..of from finishing the iterator
            if (predicate(value)) {
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
