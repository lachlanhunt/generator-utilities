import { iterate } from "../base-iterators/";
import type { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param it Any iterable object
 */
export function* fuzz(it: AnyIterable<number, void, void>) {
    for (const value of iterate(it)) {
        let n = !(value % 3) ? "Fizz" : "";
        n += !(value % 5) ? "Buzz" : "";
        yield n || value;
    }
}
