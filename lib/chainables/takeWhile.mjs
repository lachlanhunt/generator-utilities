import { iterate } from "../base-iterators/index";
import { identity } from "../utils";
/**
 *
 * @param {Iterable} it Any iterable object
 * @param predicate
 * @returns {*}
 */
export default function* takeWhile(it, predicate = identity) {
    for (let value of iterate(it)) {
        if (!predicate(value)) return value;
        yield value;
    }
}
