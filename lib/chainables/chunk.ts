import { safeIterate, iterate } from "../base-iterators";
import { AnyIterable } from "../base-iterators/types";
import { take } from "./take";

/**
 * Takes values from the supplied Iterable and yields Arrays of length n. If the Iterable object is finite,
 * the last chunk yielded will contain as many items as possible.
 *
 * @param it Any iterable object
 * @param n An integer indicating the maximum size of the Arrays to be yielded.
 */
export function* chunk<T>(it: AnyIterable<T, void, void>, n = 1) {
    const source = iterate(it);
    try {
        while (true) {
            const next = [...take(safeIterate(source), n)];
            if (!next.length) return;
            yield next;
        }
    } finally {
        source.return();
    }
}
