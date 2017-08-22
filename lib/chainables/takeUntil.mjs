import { iterate } from "../base-iterators/index";
import { identity } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 */
export default function* takeUntil(it, predicate = identity) {
    for (let value of iterate(it)) {
        yield value;
        if (predicate(value)) return;
    }
}
