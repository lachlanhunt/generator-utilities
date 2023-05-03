import { isIterable } from "./isIterable";
import { toLength } from "../utils";

/**
 * Generator that delegates iteration to the provided object's iterator via [Symbol.iterator], or iterates over the object's indexed values.
 *
 * @generator
 * @param it Any iterable or array-like object
 * @yields Values from the provided object's iterator, or its indexed values
 */
export function* iterate<T>(it: Iterable<T> | ArrayLike<T>) {
    if (isIterable(it)) {
        yield* it;
    } else {
        // Treat as array-like
        const len = toLength(it.length);
        for (let i = 0; i < len; i++) {
            yield it[i];
        }
    }
}
