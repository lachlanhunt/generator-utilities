import { iterate } from "../base-iterators/";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param prop
 */
export function* pluck(it, prop) {
    for (const value of iterate(it)) {
        yield value !== null && value !== undefined ? value[prop] : undefined;
    }
}
