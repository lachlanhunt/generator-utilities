import { iterate } from "../base-iterators/";

/**
 *
 * @param {Iterable} it Any iterable object
 * @param generatorFn
 * @param args
 */
export function* link(it, generatorFn, ...args) {
    yield* generatorFn(iterate(it), ...args);
}
