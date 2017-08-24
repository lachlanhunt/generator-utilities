import { iterate } from "../base-iterators/index";

/**
 *
 * @param them
 */
export default function* interlace(...them) {
    let iterators = them.map(iterate);

    while (true) {
        for (let iterator of iterators) {
            let next = iterator.next();
            if (next.done) return;
            yield next.value;
        }
    }
}
