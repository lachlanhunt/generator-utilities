import { isIterable, iterate } from "../base-iterators";
import type { AnyIterable, GeneratorReturnType } from "../base-iterators/types";

/**
 * Yield the first `n` values from the given iterable.
 *
 * @param it Any Generator, Iterable or Array-like object
 * @param n The number of values to yield
 * @yields The first `n` values from the given iterable
 */
export function* take<T, TReturn, TNext>(it: AnyIterable<T, TReturn, TNext>, n = 1): GeneratorReturnType<typeof it> {
    let count = 0;
    if (n <= 0) return;

    if (isIterable(it)) {
        const iterable = iterate(it);
        try {
            let nextInput: TNext;

            let result: IteratorResult<T, TReturn | void> = iterable.next();
            while (!result.done) {
                nextInput = yield result.value;

                if (++count >= n) return;

                result = iterable.next(nextInput);
            }
            return result.value;
        } finally {
            iterable.return();
        }
    } else {
        const iterable = iterate(it);
        for (const value of iterable) {
            yield value;

            if (++count >= n) return;
        }
    }
}
