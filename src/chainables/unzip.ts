import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";
import { zip } from "./zip";

/**
 *
 * @param it Any iterable object
 */
export function* unzip<T>(it: AnyIterable<AnyIterable<T>>) {
    yield* zip(...iterate(it));
}
