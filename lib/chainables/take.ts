import { isIterable, iterate } from "../base-iterators/";
import { AnyIterable, GeneratorReturnType, Iterable } from "../base-iterators/types";

/**
 * Yield the first `n` values from the given iterable.
 * @param it Any Generator, Iterable or Array-like object
 * @param n The number of values to yield
 * @yields The first `n` values from the given iterable
 */
export function* take<T, TReturn, TNext = unknown>(
    it: AnyIterable<T, TReturn, TNext>,
    n = 1
): GeneratorReturnType<typeof it, T, TReturn | void, TNext> {
    let count = 0;
    if (n <= 0) return;

    if (isIterable(it)) {
        const iterator = iterate(it);

        let nextInput: typeof it extends Iterable<unknown, unknown, infer TNext> ? TNext : undefined;

        let result: IteratorResult<T, TReturn | void> = iterator.next();
        while (!result.done) {
            nextInput = (yield result.value) as TNext;

            if (++count >= n) {
                iterator.return();
                return;
            }

            result = iterator.next(nextInput);
        }
        return result.value;
    } else {
        const iterator = iterate(it);

        while (true) {
            const { done, value } = iterator.next();
            if (done) return value;

            yield value;

            if (++count >= n) return;
        }
    }
}
