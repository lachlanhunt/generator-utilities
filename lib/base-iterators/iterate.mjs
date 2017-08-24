import isIterable from "./isiterable";
import { toLength } from "../utils";

/**
 * Generator that delegates iteration to the provided object's iterator via [Symbol.iterator].
 *
 * @generator
 * @param  {Iterable}    it Any iterable object
 * @yields {*} Values from the provided object's iterator
 */
export default function* iterate(it) {
    if (isIterable(it)) {
        yield* it;
    } else {
        // Treat as array-like
        let len = toLength(it.length);
        for (let i = 0; i < len; i++) {
            yield it[i];
        }
    }
}
