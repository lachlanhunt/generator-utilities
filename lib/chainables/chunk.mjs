import { safeIterate, iterate } from "../base-iterators/index";
import take from "./take";

/**
 * Takes values from the supplied Iterable and yields Arrays of length n. If the Iterable object is finite,
 * the last chunk yielded will contain as many items as possible.
 *
 * @param {Iterable} it Any iterable object
 * @param {number} n An integer indicating the maximum size of the Arrays to be yielded.
 */
export default function* chunk(it, n = 1) {
    let source = iterate(it);

    try {
        while (true) {
            let next = [...take(safeIterate(source), n)];
            if (!next.length) return;
            yield next;
        }
    } finally {
        source.return();
    }
}
