import { toLength } from "../utils";

/**
 * Generator that yields values from an array-like object in reverse, beginning
 * from the last item until the first
 *
 * @generator
 * @param  {ArrayLike} arrayLike An Array or Array-like object with a length property and
 *                                  numeric properties.
 * @yields {*} Values from an Array or Array-like object beginning from the highest index
 */
export default function* reverse(arrayLike) {
    for (let i = toLength(arrayLike.length) - 1; i >= 0; i--) {
        yield arrayLike[i];
    }
}
