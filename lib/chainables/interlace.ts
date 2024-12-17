import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param them
 */
export function* interlace<T>(...them: AnyIterable<T>[]) {
    const iterators = them.map(iterate);

    try {
        while (true) {
            for (const iterator of iterators) {
                const next = iterator.next();
                if (next.done) return;
                yield next.value;
            }
        }
    } finally {
        for (const iterator of iterators) {
            iterator.return();
        }
    }
}
