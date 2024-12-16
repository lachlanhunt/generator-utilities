import { isIterable, iterate } from "../base-iterators/";
import { isArrayLike } from "../utils";

interface Iterable<T, TReturn = unknown, TNext = unknown> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

/**
 * Takes any number of parameters and sequentially yields all values from them. If the given object is
 * Iterable, all values from that will be yielded individually. Otherwise, the value will be yielded
 * directly.
 *
 * @param them Any objects or values
 */
export function* concat<T, TNext = unknown>(
    ...them: (Iterable<T, void, TNext> | ArrayLike<T> | T)[]
): Generator<T, void, TNext> {
    for (const it of them) {
        if (isIterable(it)) {
            yield* it;
        } else if (isArrayLike(it)) {
            yield* iterate(it);
        } else {
            yield it;
        }
    }
}
