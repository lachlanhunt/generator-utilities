import { iterate } from "../base-iterators/index";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param n
 * @param takeFirst
 */
export default function* everyNth(it, n, takeFirst = false) {
    let i = +!takeFirst;

    for (let value of iterate(it)) {
        if (i === 0) {
            yield value;
        }
        i = (i + 1) % n;
    }
}
