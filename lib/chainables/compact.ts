import { identity } from "../utils";
import { filter } from "./filter";

/**
 * Takes values from the supplied Iterable and yields only truthy values. The falsey values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` will be excluded.
 *
 * @param {Iterable} it Any iterable object
 */
export function* compact(it) {
    yield* filter(it, identity);
}
