import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param prop
 */
export default function* pluck(it, prop) {
    for (let value of iterate(it)) {
        yield value !== null && value !== undefined ? value[prop] : undefined;
    }
}
