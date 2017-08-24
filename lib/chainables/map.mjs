import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param mapFn
 */
export default function* map(it, mapFn) {
    for (let value of iterate(it)) {
        yield mapFn(value);
    }
}
