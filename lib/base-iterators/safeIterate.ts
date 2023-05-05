import { isIterable } from "./isIterable";
import { iterate } from "./iterate";
import { AnyIterable, GeneratorReturnType, Iterable } from "./types";

/**
 * Delegates iteration to the provided Generator, but prevents a return call propagating to the wrapped iterator when
 * this generator is ended.
 *
 * @param it Any generator.
 * @yields Values from the provided generator.
 */
export function safeIterate<T, TReturn, TNext>(it: Generator<T, TReturn, TNext>): typeof it;

/**
 * Delegates iteration to the provided object's iterator via `[Symbol.iterator]`, but prevents a return call propagating
 * to the wrapped iterator when when this generator is ended.
 *
 * @param it Any iterable object.
 * @yields Values from the provided object's iterator.
 */
export function safeIterate<T, TReturn, TNext>(
    it: Iterable<T, TReturn, TNext>
): ReturnType<(typeof it)[typeof Symbol.iterator]> extends Iterator<infer TYield, infer TReturn, infer TNext>
    ? Generator<TYield, TReturn, TNext>
    : never;

/**
 * Iterates over the object's indexed values.
 *
 * @param it Any Array-like object.
 * @yields The object's indexed values.
 */
export function safeIterate<T>(it: ArrayLike<T>): Generator<T, void, undefined>;

/**
 * Delegates iteration to the provided Generator or the provided object's iterator,
 * or iterates over the object's indexed values.
 *
 * @param it Any Generator, Iterable or Array-like object
 * @yields Values from the provided generator or object's iterator, or its indexed values.
 */
export function safeIterate<T, TReturn, TNext>(
    it: AnyIterable<T, TReturn, TNext>
): GeneratorReturnType<typeof it, T, TReturn, TNext>;

export function* safeIterate<T, TReturn, TNext>(it: AnyIterable<T, TReturn, TNext>) {
    if (isIterable(it)) {
        const iterator = iterate(it);

        let nextInput: TNext;

        let result: IteratorResult<T, TReturn | void>;
        for (result = iterator.next(); !result.done; result = iterator.next(nextInput)) {
            nextInput = (yield result.value) as TNext;
        }
        return result.value;
    } else {
        const iterator = iterate(it);

        while (true) {
            const { done, value } = iterator.next();
            if (done) return;

            yield value;
        }
    }
}
