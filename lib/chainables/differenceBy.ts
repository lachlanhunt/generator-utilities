import { iterate } from "../base-iterators/index";
import { identity } from "../utils";

/**
 * Exclude any items from the given Iterable that are also present in the provided values, where each value
 * is mapped using the supplied map function prior to comparing. Any Iterable passed to the values parameter
 * must yield a finite sequence to avoid an infinite loop.
 *
 * @param {Iterable} it Any iterable object
 * @param {Iterable} values An array or finitely iterable object containing the set of values
 *         to be excluded by the generator.
 * @param mapFn
 */
export function* differenceBy(it, values, mapFn = identity) {
    const source = iterate(it);
    const exclusions = Array.from(values, mapFn);

    for (const value of source) {
        if (!exclusions.includes(mapFn(value))) {
            yield value;
        }
    }
}
