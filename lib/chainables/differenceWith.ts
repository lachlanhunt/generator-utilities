import { iterate } from "../base-iterators/index";
import { isEqual } from "../utils";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param values
 * @param comparator
 */
export function* differenceWith(it, values, comparator = isEqual) {
    let source = iterate(it);
    let exclusions = Array.from(values);

    for (let value of source) {
        if (!exclusions.some((otherValue) => comparator(value, otherValue))) {
            yield value;
        }
    }
}
