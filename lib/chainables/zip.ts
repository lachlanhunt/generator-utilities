import { iterate } from "../base-iterators/index";

/**
 *
 * @param them
 */
export function* zip(...them) {
    if (them.length) {
        let iterators = them.map(iterate);
        while (true) {
            let values = iterators.map((iterator) => iterator.next());
            if (values.some((value) => value.done)) return;
            yield values.map((value) => value.value);
        }
    }
}
