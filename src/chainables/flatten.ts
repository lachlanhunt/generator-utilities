import { iterate, isIterable } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { isArrayLike } from "../utils";

/**
 *
 * @param it Any iterable or non-iterable object. If the object is iterable, it will be flattened recursively, up to the specified maximum depth.
 * @param maxDepth
 */
export function* flatten<T>(it: T | AnyIterable<T>, maxDepth = Infinity): Generator<T, void, void> {
    maxDepth = +maxDepth || 0;

    if (isIterable(it) || isArrayLike(it)) {
        for (const value of iterate(it)) {
            if (maxDepth > 0 && typeof value !== "string" && isIterable(value)) {
                yield* flatten(value, maxDepth - 1);
            } else {
                yield value;
            }
        }
    } else {
        yield it;
    }
}
