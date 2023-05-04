import { isIterable } from "./isIterable";
import { toLength } from "../utils";
import { AnyIterable, Iterable } from "./types";

/**
 * Delegates iteration to the provided Generator.
 *
 * @param it Any generator.
 * @yields Values from the provided object's iterator, or its indexed values.
 */
export function iterate<T, TReturn, TNext>(it: Generator<T, TReturn, TNext>): typeof it;

/**
 * Delegates iteration to the provided object's iterator via `[Symbol.iterator]`.
 *
 * @param it Any iterable object.
 * @yields Values from the provided object's iterator, or its indexed values.
 */
// extends Iterable<unknown, unknown, unknown>
export function iterate<T, TReturn, TNext>(
    it: Iterable<T, TReturn, TNext>
): ReturnType<(typeof it)[typeof Symbol.iterator]> extends Iterator<infer TYield, infer TReturn, infer TNext>
    ? Generator<TYield, TReturn, TNext>
    : never;

/**
 * Iterates over the object's indexed values.
 *
 * @param it Any array-like object.
 * @yields Values from the provided object's iterator, or its indexed values.
 */
export function iterate<T>(it: ArrayLike<T>): Generator<T, void, undefined>;

export function* iterate<T, TReturn, TNext>(it: AnyIterable<T, TReturn, TNext>) {
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
