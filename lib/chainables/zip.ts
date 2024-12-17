import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param them
 */
export function* zip<T>(...them: AnyIterable<T>[]) {
    if (them.length) {
        const iterators = them.map(iterate);
        while (true) {
            const values = iterators.map((iterator) => iterator.next());
            if (values.some((value) => value.done)) return;
            yield values.map((value) => value.value);
        }
    }
}
