import { iterate } from "./iterate";

/**
 * Generator that yields values from the provided object's iterator via [Symbol.iterator],
 * but prevents a return call propagating to the wrapped iterator when when this generator is ended.
 *
 * @generator
 * @param  {Iterable} it Any iterable object
 * @yields {*} Values from the provided object's iterator
 */
export function* safeIterate<T>(it: Iterable<T> | ArrayLike<T>) {
    const source = iterate(it);
    let next;

    while (true) {
        next = source.next();
        if (next.done) return next.value;
        yield next.value;
    }
}
