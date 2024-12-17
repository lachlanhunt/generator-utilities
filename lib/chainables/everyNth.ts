import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";
import { counter } from "../sequences";
import { isArrayLike } from "../utils";
import { modulo } from "./modulo";
import { zip } from "./zip";

/**
 *
 * @param it Any iterable object
 * @param n
 * @param takeFirst
 */
export function* everyNth<T>(it: AnyIterable<T, void, void>, n: number, takeFirst = false) {
    if (isArrayLike(it)) {
        const start = takeFirst ? 0 : n - 1;

        for (const i of counter(start, n)) {
            if (i >= it.length /*?*/) {
                break;
            }
            yield it[i];
        }
    } else {
        const start = +!takeFirst;
        const source = iterate(it);
        const count = modulo(counter(start), n);
        for (const [value, mod] of zip<T | number>(source, count)) {
            if (mod === 0) {
                yield value;
            }
        }
    }
}
