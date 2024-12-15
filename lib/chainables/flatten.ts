import { iterate, isIterable } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param maxDepth
 */
export function* flatten(it, maxDepth = Infinity) {
    maxDepth = +maxDepth || 0;

    for (let value of iterate(it)) {
        if (maxDepth > 0 && typeof value !== "string" && isIterable(value)) {
            yield* flatten(value, maxDepth - 1);
        } else {
            yield value;
        }
    }
}
