import { iterate } from "../base-iterators/index";
import { zip } from "./zip";

/**
 *
 * @param {Iterable} it Any iterable object
 */
export function* unzip(it) {
    yield* zip(...iterate(it));
}
