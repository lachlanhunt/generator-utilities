import { iterate, safeIterate } from "../base-iterators/index";
import take from "./take";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 */
export default function* drop(it, n = 1) {
    let source = iterate(it);
    void [...take(safeIterate(source), n)]; // Safely iterate to prevent take() from finishing the iterator
    yield* source;
}
