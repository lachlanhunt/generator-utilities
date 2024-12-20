import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";

/**
 * If called with a generator function, this will invoke the function with the supplied arguments to obtain
 * an iterator, yield all of its values until it ends, and then repeat.
 *
 * If called with an object implementing the Iterable protocol, it will repeatedly iterate it, yielding its
 * values. In this case, any given args are ignored.
 *
 * @param generatorFnOrIterable
 * @param [args]
 */
export function repeat<T>(it: AnyIterable<T>): Generator<T>;
export function repeat<T, TArgs extends unknown[]>(
    generatorFn: (...args: TArgs) => Generator<T, void, void>,
    ...args: TArgs
): Generator<T>;

export function* repeat<T, TArgs extends unknown[]>(
    generatorFnOrIterable: AnyIterable<T> | ((...args: TArgs) => Generator<T, void, void>),
    ...args: TArgs
) {
    while (true) {
        const it = typeof generatorFnOrIterable === "function" ? generatorFnOrIterable(...args) : generatorFnOrIterable;
        let empty = true;

        for (const value of iterate(it)) {
            empty = false;
            yield value;
        }
        // Guard against empty iterators
        if (empty) return;
    }
}
