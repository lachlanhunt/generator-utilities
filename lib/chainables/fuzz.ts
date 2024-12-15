import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 */
export function* fuzz(it) {
    for (let value of iterate(it)) {
        let n = !(value % 3) ? "Fizz" : "";
        n += !(value % 5) ? "Buzz" : "";
        yield n || value;
    }
}
