import { iterate } from "../base-iterators";
import type { AnyIterable } from "../base-iterators/types";

/**
 *
 * @param it Any iterable object
 * @param generatorFn
 * @param args
 */
export function* link<T, TArgs extends unknown[]>(
    it: AnyIterable<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generatorFn: (it: Generator<T, any, any>, ...args: TArgs) => Generator,
    ...args: TArgs
) {
    yield* generatorFn(iterate(it), ...args);
}
