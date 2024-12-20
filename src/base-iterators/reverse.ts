import { toLength } from "../utils";

/**
 * Generator that yields values from an array-like object in reverse, beginning
 * from the last item until the first
 *
 * @generator
 * @param arrayLike An Array or Array-like object with a length property and
 *                                  numeric properties.
 * @yields Values from an Array or Array-like object beginning from the highest index
 */
export function* reverse<T>(arrayLike: ArrayLike<T>) {
    for (let i = toLength(arrayLike.length) - 1; i >= 0; i--) {
        yield arrayLike[i];
    }
}
