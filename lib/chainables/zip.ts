import { iterate } from "../base-iterators/index";

/**
 *
 * @param them
 */
export function* zip(...them) {
    if (them.length) {
        const iterators = them.map(iterate);
        while (true) {
            const values = iterators.map((iterator) => iterator.next());
            if (values.some((value) => value.done)) return;
            yield values.map((value) => value.value);
        }
    }
}
