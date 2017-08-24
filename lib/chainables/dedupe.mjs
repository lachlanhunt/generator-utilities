import { iterate } from "../base-iterators/index";
import { isEqual } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param comparator
 */
export default function* dedupe(it, comparator = isEqual) {
    let source = iterate(it);
    let prev;
    let firstValue = true;

    for (let value of source) {
        if (firstValue || !comparator(value, prev)) {
            prev = value;
            yield value;
        }
        firstValue = false;
    }
}
